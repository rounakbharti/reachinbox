import { elasticClient } from '../config/elasticClient';
import { getEmbedding } from '../embeddings/embed';

export const indexEmail = async (emailId: string, text: string, metadata: any) => {
  const vector = await getEmbedding(text);

  await elasticClient.index({
    index: 'emails',
    id: emailId,
    body: {
      text,
      vector,
      ...metadata,
    }
  });
};
