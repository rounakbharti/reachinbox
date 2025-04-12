// src/scripts/initIndex.ts
import { pinecone } from '../config/pineconeClient';

const initIndex = async () => {
  const indexName = process.env.PINECONE_INDEX_NAME!;
  const dimension = 384; // use 768 if you're using larger models like BERT

  const existing = await pinecone.listIndexes();
  if (existing.indexes.some(i => i.name === indexName)) {
    console.log(`Index "${indexName}" already exists`);
    return;
  }

  await pinecone.createIndex({
    name: indexName,
    dimension,
    metric: 'cosine',
    spec: {
      serverless: {
        cloud: 'aws',
        region: 'us-east-1',
      },
    },
  });

  console.log(`✅ Created index: ${indexName}`);
};

initIndex().catch(console.error);
