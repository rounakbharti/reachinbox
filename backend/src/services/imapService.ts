import { simpleParser, ParsedMail, AddressObject } from 'mailparser';
import { createImapClient, ImapAccountConfig } from '../config/imapConfig';
import { saveEmailToElasticsearch } from './elasticsearchService';
import { getEmbedding } from '../utils/embedding';
import { classifyWithElasticsearch } from './classifierService';
import { sendSlackNotification } from '../utils/slackNotifier';
import { triggerWebhook } from '../utils/webhookTrigger';

function extractAddresses(input?: AddressObject | AddressObject[]): string[] {
  if (!input) return [];
  const groups = Array.isArray(input) ? input : [input];
  return groups.flatMap((group) =>
    (group.value ?? []).map((addr) => addr.address || '')
  );
}

function shouldSkipFolder(folder: string): boolean {
  const lower = folder.toLowerCase();
  return (
    lower.includes('trash') ||
    lower.includes('spam') ||
    lower.includes('draft') ||
    lower.includes('junk')
  );
}

export async function syncEmails(accounts: ImapAccountConfig[]) {
  const sinceDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); 

  for (const account of accounts) {
    const client = await createImapClient(account);
    const boxes = await client.list();

    console.log(`📦 All folders for ${account.user}:`);
    boxes.forEach((box) => console.log(`   • ${box.path}`));

    for (const box of boxes) {
      const mailbox = box.path;

      if (box.flags?.has('\\Noselect') || shouldSkipFolder(mailbox)) {
        console.log(`⚠️ Skipping folder: ${mailbox}`);
        continue;
      }

      console.log(`📁 Syncing mailbox: ${mailbox} for ${account.user}`);

      try {
        await client.mailboxOpen(mailbox);
      } catch (err) {
        console.error(`❌ Error opening ${mailbox} for ${account.user}:`, err);
        continue;
      }

      const uids = await client.search({ since: sinceDate });
      let highestUid = 0;

      for await (const msg of client.fetch(uids, { envelope: true, source: true })) {
        await processAndStoreEmail(msg, account.user, mailbox);
        highestUid = Math.max(highestUid, msg.uid!);
      }

      console.log(`✅ Synced ${uids.length} emails from ${mailbox} for ${account.user}`);

      client.on('mail', async () => {
        console.log(`📬 New mail event in ${mailbox} for ${account.user}`);
        const newRange = `${highestUid + 1}:*`;

        for await (const msg of client.fetch(newRange, { envelope: true, source: true })) {
          await processAndStoreEmail(msg, account.user, mailbox);
          highestUid = Math.max(highestUid, msg.uid!);
          console.log(`   • Indexed new UID ${msg.uid} from ${mailbox}`);
        }
      });
    }

    console.log(`⏳ Listening for new emails across all folders on ${account.user}...`);
  }
}

async function processAndStoreEmail(msg: any, accountUser: string, mailbox: string) {
  const parsed: ParsedMail = await simpleParser(msg.source!);
  const fromAddrs = extractAddresses(parsed.from);
  const toAddrs = extractAddresses(parsed.to);
  const htmlBody = typeof parsed.html === 'string' ? parsed.html : '';
  const subject = parsed.subject ?? msg.envelope.subject ?? '';
  const textBody = parsed.text ?? htmlBody;

  let embedding: number[] = [];
  let category = '';
  try {
    const emailContent = `${subject}\n\n${textBody}`;
    embedding = await getEmbedding(emailContent);
    category = await classifyWithElasticsearch(embedding);
    console.log(`🧠 [${accountUser} | ${mailbox}] RAG Classified as: ${category}`);
  } catch (err) {
    console.error(`⚠️ [${accountUser} | ${mailbox}] Classification error:`, err);
  }

  const doc = {
    subject,
    text: parsed.text ?? '',
    html: htmlBody,
    date: msg.envelope.date!,
    from: fromAddrs[0] ?? '',
    to: toAddrs,
    folder: mailbox,
    account: accountUser,
    uid: msg.uid!,
    category,
    vector: embedding,
  };

  if (category === 'Interested') {
    await sendSlackNotification(subject, fromAddrs[0] ?? '', accountUser);
    await triggerWebhook(doc);
  }

  await saveEmailToElasticsearch(doc);
}
