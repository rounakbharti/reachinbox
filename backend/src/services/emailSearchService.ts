// services/emailSearchService.ts
import { elasticClient } from '../config/elasticClient';

interface EmailSearchOptions {
    query?: string;
    folder?: string;
    account?: string;
    category?: string;
    page?: number;
    size?: number;
  }


export async function searchEmails({
    query,
    folder,
    account,
    category,
    page = 1,
    size = 100,
  }: EmailSearchOptions) {
    const must: any[] = [];
  
    if (query) {
      must.push({
        multi_match: {
          query,
          fields: ['subject', 'text', 'from', 'to'],
        },
      });
    }
  
    if (folder) {
      must.push({ match: { folder } });
    }
  
    if (account) {
      must.push({ match: { account } });
    }
  
    if (category) {
      must.push({ match: { category } });
    }
  
    const result = await elasticClient.search({
      index: 'emails',
      from: (page - 1) * size,
      size,
      query: must.length > 0 ? { bool: { must } } : { match_all: {} },
    });
  
    return {
      hits: result.hits.hits.map(hit => hit._source),
      total: result.hits.total,
    };
  }
