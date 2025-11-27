import type { Subscription } from "@/components/types"

  export const countCategories = (category: string) => {
    const subscriptions: Subscription[] = []
    return subscriptions.filter(sub => sub.category.toLowerCase() === category.toLowerCase()).length
  }
