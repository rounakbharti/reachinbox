import { elasticClient } from '../config/elasticsearch';
import { emailIndexMapping } from '../config/emailIndexMapping';
import { generateEmbedding } from './embeddingService';

const INDEX = 'emails';

export interface SavedEmail {
  subject: string;
  text: string;
  html: string;
  date: string | Date;
  from: string;
  to: string[];
  folder: string;
  account: string;
  uid: number;
  category?: string;
  vector?: number[];
}

export async function ensureEmailIndex() {
  const exists = await elasticClient.indices.exists({ index: INDEX });
  if (!exists) {
    await elasticClient.indices.create({ index: INDEX, ...emailIndexMapping });
    console.log(`✅ Created index '${INDEX}'`);
  }
}

export async function saveEmailToElasticsearch(email: SavedEmail) {
    await ensureEmailIndex();

    const embedding = await generateEmbedding(email.text || email.subject || '');
    const category = await classifyWithElasticsearch(embedding);

    await elasticClient.index({
        index: INDEX,
        document: {
            ...email,
            vector: embedding,
            category
        }
    });

    console.log(`📩 Email saved & classified as '${category}'`);
}

async function classifyWithElasticsearch(embedding: number[]): Promise<string> {
    const response = await elasticClient.search({
        index: INDEX,
        knn: {
            field: 'vector',
            query_vector: embedding,
            k: 1,
            num_candidates: 10
        }
    });

    const hits = response.hits.hits;
    if (hits.length > 0) {
        const topHit = hits[0]._source as SavedEmail;
        return topHit.category || 'Uncategorized';
    }

    return 'Uncategorized';
}

