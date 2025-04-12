// src/services/classifierService.ts
import { elasticClient } from '../config/elasticClient';
import { getCategoryEmbeddings, CATEGORY_TEXTS } from '../utils/categories';
import cosineSimilarity from '../utils/cosineSimilarity';

export const classifyWithElasticsearch = async (emailVector: number[]): Promise<string> => {
  const categoryEmbeddings = await getCategoryEmbeddings();

  let bestLabel = 'Uncategorized';
  let bestScore = -Infinity;

  for (const [label, catVec] of Object.entries(categoryEmbeddings)) {
    const score = cosineSimilarity(emailVector, catVec);
    if (score > bestScore) {
      bestScore = score;
      bestLabel = label;
    }
  }

  return bestLabel;
};
