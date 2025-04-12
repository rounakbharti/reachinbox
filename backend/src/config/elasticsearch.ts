import { Client } from '@elastic/elasticsearch';

const ES_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';

export const elasticClient = new Client({
  node: ES_NODE
});
