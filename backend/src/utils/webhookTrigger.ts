import axios from 'axios';

export async function triggerWebhook(emailData: any) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await axios.post(webhookUrl, emailData);
  } catch (err) {
    console.error('❌ Webhook trigger failed:', err);
  }
}
