import express, { Request, Response } from 'express';  // Ensure these are correctly imported
import { syncEmails } from '../services/imapService';
import { searchEmails } from '../services/emailSearchService'; 
import { classifyEmail } from '../services/aiService';
import { suggestReply } from '../services/suggestReplyService';

const router = express.Router();

// Sync Emails Route
router.post('/sync', async (req: Request, res: Response) => {
  const { accounts } = req.body;
  try {
    await syncEmails(accounts);
    res.sendStatus(200);
  } catch (err) {
    console.error('Sync failed:', err);
    res.status(500).json({ error: 'Failed to sync emails' });
  }
});

// Fetch Emails Route
router.get('/emails', async (req: Request, res: Response) => {
  try {
    const { query, folder, account, category, page = 1, size = 100 } = req.query;
    const { hits, total } = await searchEmails({
      query: query as string,
      folder: folder as string,
      account: account as string,
      category: category as string,
      page: Number(page),
      size: Number(size),
    });
    res.json({ hits, total });
  } catch (err) {
    console.error('❌ Error fetching emails:', err);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

// Classify Email Route
router.post('/classify-email', async (req: Request, res: Response) => {
  const { subject, body } = req.body;
  try {
    const category = await classifyEmail(subject, body);
    res.json({ category });
  } catch (err) {
    console.error('Classification Error:', err);
    res.status(500).json({ error: 'Classification failed' });
  }
});

// Search Emails Route
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { query, folder, account } = req.query;
    console.log('Search query:', folder);  // Log the search query for debugging
    const { hits, total } = await searchEmails({
      query: query as string,
      folder: folder as string,
      account: account as string,
    });
    console.log('Search results:', hits);  // Log the search results for debugging
    res.json({ hits, total });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

router.post('/suggest-reply', async (req: Request, res: Response): Promise<void> => {
    const { emailText } = req.body;
  
    if (!emailText) {
      res.status(400).json({ error: 'emailText is required' });
      return;  // Exit without returning a Response
    }
    console.log('📧 Email text:', emailText);  // Log the email text for debugging
    try {
      const reply = await suggestReply(emailText);
      res.json({ reply });  // Simply send the response
    } catch (err) {
      console.error('❌ Error suggesting reply:', err);
      res.status(500).json({ error: 'Failed to generate reply' });
    }
  });

export default router;
