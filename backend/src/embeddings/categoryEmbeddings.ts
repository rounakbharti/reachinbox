import { getEmbedding } from './embed';

export const CATEGORY_TEXTS: Record<string, string> = {
  Interested: "The sender is interested in the proposal or offer.",
  'Meeting Booked': "A meeting or call has been scheduled or confirmed.",
  'Not Interested': "The sender is not interested or rejected the proposal.",
  Spam: "This email is spam or irrelevant.",
  'Out of Office': "The sender is currently out of office or unavailable.",
};

let cachedCategoryEmbeddings: { [label: string]: number[] } = {};

export const getCategoryEmbeddings = async () => {
  if (Object.keys(cachedCategoryEmbeddings).length === 0) {
    for (const label in CATEGORY_TEXTS) {
      cachedCategoryEmbeddings[label] = await getEmbedding(CATEGORY_TEXTS[label]);
    }
  }
  return cachedCategoryEmbeddings;
};
