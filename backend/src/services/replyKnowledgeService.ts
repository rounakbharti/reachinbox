// src/services/replyKnowledgeService.ts

import { elasticClient } from '../config/elasticClient';

export async function saveReplyKnowledge(id: string, text: string, embedding: number[]) {
  await elasticClient.index({
    index: 'reply_knowledge',
    id,
    body: {
      text,
      vector: embedding
    }
  });
}

export async function searchReplyKnowledge(queryEmbedding: number[], topK = 3) {
  const result = await elasticClient.search({
    index: 'reply_knowledge',
    size: topK,
    query: {
      script_score: {
        query: { match_all: {} },
        script: {
          source: "cosineSimilarity(params.queryVector, 'vector') + 1.0",
          params: {
            queryVector: queryEmbedding
          }
        }
      }
    }
  });

  return result.hits.hits.map((hit: any) => ({
    id: hit._id,
    text: hit._source.text,
    score: hit._score
  }));
}
