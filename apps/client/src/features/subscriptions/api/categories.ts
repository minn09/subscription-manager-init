import { API_URL } from "@/constants";
import type { Category } from "@/types/types";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/categories`);
  const categories = await response.json();
  return categories;
};
