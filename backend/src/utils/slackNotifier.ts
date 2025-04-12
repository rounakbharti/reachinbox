import axios from 'axios';

export async function sendSlackNotification(subject: string, from: string, account: string) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!slackWebhookUrl) return;

  const message = {
    text: `📩 *Interested Email Detected!*\n*Subject:* ${subject}\n*From:* ${from}\n*Account:* ${account}`,
  };

  try {
    await axios.post(slackWebhookUrl, message);
  } catch (err) {
    console.error('❌ Slack notification failed:', err);
  }
}
