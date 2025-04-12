import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDrZblB70CkF7rphGy03WMATl-BRwCVYUI');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateReplyWithLLM(prompt: string): Promise<string> {
    console.log('Prompt for LLM--------------------------------------------------------:', prompt);
    const result = await model.generateContent(prompt);
    console.log('LLM result------------------------------------------------------------:', result);
    const response = await result.response;
    const text = response.text().trim();
    return text;
  
}
