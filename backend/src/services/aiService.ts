import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function classifyEmail(subject: string, body: string): Promise<string> {
  const prompt = `
You are an email classifier. Classify the email into one of the following categories:
- Interested
- Meeting Booked
- Not Interested
- Spam
- Out of Office

Only return the category name. No explanation.

Email Subject: ${subject}
Email Body: ${body}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().trim();

  return text;
}
