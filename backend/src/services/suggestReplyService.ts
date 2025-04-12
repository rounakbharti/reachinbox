import { getEmbedding } from '../utils/embedding';
import { searchReplyKnowledge } from './replyKnowledgeService';
import { generateReplyWithLLM } from '../utils/llm';

export async function suggestReply(emailText: string): Promise<string> {
    try {
      // Example: Log input
      console.log('Generating reply for email text:', emailText);
    
      // Step 1: Get embedding, if applicable
      const emailEmbedding = await getEmbedding(emailText);
      console.log('Email embedding:', emailEmbedding);
    
      // Step 2: Search for relevant context
      const relatedDocs = await searchReplyKnowledge(emailEmbedding, 3);
      console.log('Related docs:', relatedDocs);
    
      // Step 3: Build the prompt
      const context = relatedDocs.map((d, i) => `Context ${i + 1}: ${d.text}`).join('\n');
      const prompt = `
        You are an assistant helping with professional email replies.
        Incoming email:
    
        "${emailText}"
    
        Use the following context to write a polite and relevant response:
    
        ${context}
    
        Respond accordingly:
      `;
      console.log('Prompt for LLM:', prompt);
    
      // Step 4: Call the LLM API
      const reply = await generateReplyWithLLM(prompt);
      console.log('LLM reply:', reply);
    
      return reply;
    } catch (error) {
      console.error('Error in suggestReply:', error);
      throw error; // propagate the error so the route catch can handle it
    }
  }
  
