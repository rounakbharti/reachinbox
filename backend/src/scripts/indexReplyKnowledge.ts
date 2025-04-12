// src/scripts/indexReplyKnowledge.ts

import knowledge from '../data/reply_knowledge_base.json';
import { getEmbedding } from '../utils/embedding';
import { saveReplyKnowledge } from '../services/replyKnowledgeService';

async function indexKnowledge() {
  console.log('📦 Indexing reply knowledge base...');
  for (const item of knowledge) {
    try {
      const embedding = await getEmbedding(item.text);
      await saveReplyKnowledge(item.id, item.text, embedding);
      console.log(`✅ Indexed: ${item.id}`);
    } catch (err) {
      console.error(`❌ Failed to index ${item.id}:`, err);
    }
  }
  console.log('🎉 All reply templates indexed.');
}

indexKnowledge();
