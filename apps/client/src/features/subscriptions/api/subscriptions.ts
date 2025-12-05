import { API_URL } from "@/constants";
import type { Subscription } from "@/types/types";

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await fetch(`${API_URL}/subscriptions`);
  const subscriptions = await response.json();
  return subscriptions;
};

export const deleteSubscription = async (id: number) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: "DELETE",
  });
  const subscriptions = await response.json();
  return subscriptions;
};
