// src/utils/elasticSearch.ts
import { elasticClient } from '../config/elasticClient';

export async function searchReplies(queryEmbedding: number[]): Promise<any[]> {
  try {
    const result = await elasticClient.search({
      index: 'email_replies',
      knn: {
        field: 'embedding',       // Must match mapping
        query_vector: queryEmbedding,
        k: 5,
        num_candidates: 50
      }
    });

    return result.hits.hits; // Top-k results
  } catch (error) {
    console.error('Error querying Elasticsearch:', error);
    throw error;
  }
}
