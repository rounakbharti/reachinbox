// src/services/emailProcessor.ts
import { generateEmbedding } from '../embeddings/generateEmbeddings';
import { searchReplies } from '../utils/elasticSearch';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function processEmail(emailContent: string): Promise<string> {
  try {
    const emailEmbedding = await generateEmbedding(emailContent);
    const searchResults = await searchReplies(emailEmbedding);

    if (searchResults.length === 0) {
      return 'Sorry, no relevant reply could be generated at this time.';
    }

    const relevantContext = searchResults[0]._source.context;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      `You are a helpful assistant. Based on the outreach context: "${relevantContext}", generate a professional reply to the following email: "${emailContent}"`,
    ]);

    const response = result.response.text();
    return response;
  } catch (error) {
    console.error('Error processing email:', error);
    throw error;
  }
}
