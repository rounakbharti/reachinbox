// src/config/emailIndexMapping.ts
export const emailIndexMapping = {
    mappings: {
      properties: {
        subject: { type: 'text' },
        text: { type: 'text' },
        html: { type: 'text' },
        date: { type: 'date' },
        from: { type: 'keyword' },
        to: { type: 'keyword' },
        folder: { type: 'keyword' },
        account: { type: 'keyword' },
        uid: { type: 'integer' },
        category: { type: 'keyword' },
        vector: {
            type: 'dense_vector',
            dims: 384,            // make sure this matches your embedding size
            index: true,
            similarity: 'cosine'
          }
      }
    }
  };
  