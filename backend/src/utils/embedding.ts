import { pipeline } from '@xenova/transformers';

let embedder: any;

export async function getEmbedding(text: string): Promise<number[]> {
  try {
    if (!embedder) {
      // Load the embedding model only once
      embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    // Optional: Trim very long emails to avoid issues
    const maxLength = 512;
    const trimmedText = text.length > maxLength ? text.slice(0, maxLength) : text;

    const output = await embedder(trimmedText, {
      pooling: 'mean',
      normalize: true,
    });

    return Array.from(output.data); // Float32Array → number[]
  } catch (err) {
    console.error('❌ Embedding generation failed:', err);
    return [];
  }
}
