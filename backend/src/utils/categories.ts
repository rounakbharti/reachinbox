// src/utils/categories.ts
import { getEmbedding } from './embedding';

export const CATEGORY_TEXTS = {
  Interested: "The sender is interested in the proposal or offer.",
  "Meeting Booked": "A meeting or call has been scheduled or confirmed.",
  "Not Interested": "The sender is not interested or rejected the proposal.",
  Spam: "This email is spam or irrelevant.",
  "Out of Office": "The sender is currently out of office or unavailable.",
};

type CategoryLabel = keyof typeof CATEGORY_TEXTS;
type CategoryEmbeddings = Record<CategoryLabel, number[]>;

let cachedCategoryEmbeddings: CategoryEmbeddings | null = null;

export const getCategoryEmbeddings = async (): Promise<CategoryEmbeddings> => {
  if (cachedCategoryEmbeddings) return cachedCategoryEmbeddings;

  const result: Partial<CategoryEmbeddings> = {};
  for (const label of Object.keys(CATEGORY_TEXTS) as CategoryLabel[]) {
    result[label] = await getEmbedding(CATEGORY_TEXTS[label]);
  }

  cachedCategoryEmbeddings = result as CategoryEmbeddings;
  return cachedCategoryEmbeddings;
};
