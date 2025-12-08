import { API_URL } from "@/constants";
import type { Subscription } from "@/types/types";
import type { UpdateSubscription } from "@/types/types";

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

export const editSubscription = async (
  id: number,
  subscriptionData: UpdateSubscription
) => {
  try {
    const response = await fetch(`http://localhost:3000/subscriptions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Error creating subscription");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`An error has occurred ${error}`);
  }
};
