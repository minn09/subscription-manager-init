export type Subscription = {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  nextRenewal: Date;
  isRenews: boolean;
};

export type Category = {
  id: number;
  name: string;
  color: string;
};

export type CreateSubscription = Omit<Subscription, "id">;
export type CreateCategory = Omit<Category, "id">;
export type UpdateSubscription = Omit<Subscription, "id" | "isRenews">;
