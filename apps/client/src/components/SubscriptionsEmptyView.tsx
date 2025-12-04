import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  setSubscriptionDialogOpen: (state: boolean) => void,
  setCategoryDialogOpen: (state: boolean) => void
}

export default function SubscriptionsEmptyView({ setSubscriptionDialogOpen, setCategoryDialogOpen }: Props) {
  return (

    <div className="col-span-full text-center py-8 text-muted-foreground">
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/5 py-16 px-4 text-center animate-in fade-in-50">
          <div className="mb-4 rounded-full bg-blue-400/10 p-4">
            <CirclePlus className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No more subscriptions
          </h3>
          <p className="mb-8 max-w-sm text-sm text-muted-foreground leading-relaxed">
            You've reached the end of the list. Click the button below to add a new subscription and start tracking your expenses.
          </p>
          <div className="flex gap-2 flex-col md:flex-row">
            <Button className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-6"
              onClick={() => setSubscriptionDialogOpen(true)}>
              Add Subscription
            </Button>
            <Button className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-6"
              onClick={() => setCategoryDialogOpen(true)}>
              Add Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
