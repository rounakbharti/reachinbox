import express, { Request, Response } from 'express';
import cors from 'cors';
import { ImapAccountConfig } from './config/imapConfig';
import { syncEmails } from './services/imapService';
import dotenv from 'dotenv';
import router from './routes/index';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api', router);

const IMAP_ACCOUNTS: ImapAccountConfig[] = [
  {
    host: process.env.IMAP_HOST1!,
    port: Number(process.env.IMAP_PORT1!),
    user: process.env.IMAP_USER1!,
    password: process.env.IMAP_PASSWORD1!,
  },
  {
    host: process.env.IMAP_HOST2!,
    port: Number(process.env.IMAP_PORT2!),
    user: process.env.IMAP_USER2!,
    password: process.env.IMAP_PASSWORD2!,
  },
  // add more accounts here
];

// Start the server and sync emails
app.listen(3000, async () => {
  console.log('🚀 Server running on port 3000');
  try {
    console.log('🔁 Starting initial email sync...');
    await syncEmails(IMAP_ACCOUNTS);
    console.log('✅ Initial email sync completed.');
  } catch (err) {
    console.error('❌ Error during initial sync:', err);
  }
});
