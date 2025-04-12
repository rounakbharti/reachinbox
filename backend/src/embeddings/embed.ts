import { pipeline } from '@xenova/transformers';

let embedder: any;

export const getEmbedding = async (text: string): Promise<number[]> => {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return output.data;
};
