import type { Subscription } from "@/types/types";

export const countCategories = (category: number) => {
  const subscriptions: Subscription[] = [];
  return subscriptions.filter((sub) => sub.categoryId === category).length;
};
