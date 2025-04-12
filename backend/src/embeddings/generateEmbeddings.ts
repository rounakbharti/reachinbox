// src/embeddings/generateEmbedding.ts
import { pipeline } from '@xenova/transformers';

// Load the sentence embedding pipeline
const embeddingPipelinePromise = pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const embeddingPipeline = await embeddingPipelinePromise;

        const output = await embeddingPipeline(text, {
            pooling: 'mean',   // average the token embeddings
            normalize: true    // normalize the vector (for cosine similarity)
        });

        return Array.from(output.data);  // output.data is a Float32Array
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}
