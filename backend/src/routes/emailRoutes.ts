// routes/emailRoutes.ts
import express from 'express';
import { searchEmails } from '../services/emailSearchService';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { query, folder, account, category, page = 1, size = 10 } = req.query;
    const results = await searchEmails({
      query: query as string,
      folder: folder as string,
      account: account as string,
      category: category as string,
      page: Number(page),
      size: Number(size),
    });
    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

router.get('/search', async (req, res) => {
    try {
      const { query, folder, account, category, page = 1, size = 1000 } = req.query;
      console.log('Search query:', folder);  // Log the search query for debugging
      const results = await searchEmails({
        query: query as string,
        folder: folder as string,
        account: account as string,
        category: category as string,
        page: Number(page),
        size: Number(size),
      });
  console.log('Search results:', results);  // Log the search results for debugging
      res.json({ results });
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: 'Search failed' });
    }
  });
  

export default router;
