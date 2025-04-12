import { generateEmbedding } from '../utils/embedding';
import { searchSimilarEmails } from '../utils/elasticSearch'; // hypothetical method
import { classifyEmail } from '../utils/categories'; // hypothetical logic
import { sendSlackNotification } from '../utils/slackNotifier'; // optional

async function runTest() {
  const input = 'Hi, I’m interested in your product. Can we set up a meeting next week?';
  
  const embedding = await generateEmbedding(input);
  console.log('✅ Embedding generated successfully!');

  // Search in Elasticsearch
  const similarEmails = await searchSimilarEmails(embedding, 1); // top 1
  console.log('🔍 Similar Emails from ES:', similarEmails);

  if (similarEmails.length === 0) {
    console.log('❌ No similar emails found.');
    return;
  }

  const topMatch = similarEmails[0];

  // Use similarity score or metadata to classify
  const category = topMatch._source?.category ?? 'Unknown';
  console.log(`🧠 Classified as: ${category}`);

  // Trigger action if needed
  if (category === 'Interested') {
    await sendSlackNotification(topMatch._source);
    console.log('📣 Slack notification sent!');
  }
}

runTest().catch(console.error);
