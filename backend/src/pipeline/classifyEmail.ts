import { getCategoryEmbeddings } from '../embeddings/categoryEmbeddings';
import { getEmbedding } from '../embeddings/embed';

const cosineSimilarity = (a: number[], b: number[]) => {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (magA * magB);
};

export const classifyEmail = async (emailText: string): Promise<string> => {
  const emailEmbedding = await getEmbedding(emailText);
  const categoryEmbeddings = await getCategoryEmbeddings();

  let bestCategory = '';
  let bestScore = -Infinity;

  for (const [label, vector] of Object.entries(categoryEmbeddings)) {
    const score = cosineSimilarity(emailEmbedding, vector);
    if (score > bestScore) {
      bestScore = score;
      bestCategory = label;
    }
  }

  return bestCategory;
};
