import type { CreateSubscription } from "@/types/types";

export const createSubscription = async (
  subscriptionData: CreateSubscription
) => {
  try {
    const response = await fetch("http://localhost:3000/subscriptions", {
      method: "POST",
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
