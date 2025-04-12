import { TextServiceClient } from '@google-ai/generativelanguage';

export const geminiClient = new TextServiceClient({
  apiKey: process.env.GOOGLE_API_KEY!,
});