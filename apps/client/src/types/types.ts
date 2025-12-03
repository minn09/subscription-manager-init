export type Subscription = {
  id: string;
  title: string;
  categoryId: number;
  nextRenewal: Date;
  price: number;
  isRenews: boolean;
};

export type Category = {
  id: number;
  name: string;
  color: string;
};
