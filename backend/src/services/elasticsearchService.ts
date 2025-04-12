import { Client } from '@elastic/elasticsearch';
import { elasticClient } from '../config/elasticClient';
import { emailIndexMapping } from '../config/emailIndexMapping';



const ES_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
const esClient = new Client({ node: ES_NODE });
const INDEX = 'emails';

export async function ensureEmailIndex() {
  const exists = await esClient.indices.exists({ index: INDEX });
  if (!exists) {
    await esClient.indices.create({ index: INDEX, ...emailIndexMapping });
    console.log(`Created Elasticsearch index: ${INDEX}`);
  }
}

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
}

export const saveEmailToElasticsearch = async (doc: any) => {
  await elasticClient.index({
    index: 'emails',
    id: `${doc.account}_${doc.uid}`, // unique ID
    document: doc,
  });
};
