import { storeContext, initRAG } from './src/services/ragService';  

(async () => {
  await initRAG();
  await storeContext('product-info', 'ReachInbox is an AI-powered outreach automation tool...');
  await storeContext('interview-reply', 'If a lead is interested, send https://cal.com/example');
})();