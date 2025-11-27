import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { type Subscription, type Category } from './types'

type SubscriptionDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  setSubscriptions: (subscriptions: Subscription[]) => void
  subscriptions: Subscription[]
  categories: Category[]
}

export function SubscriptionDialog({ open, setOpen, setSubscriptions, subscriptions, categories }: SubscriptionDialogProps) {
  const addSubscription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Recuperar los datos del formulario y asignarlos al estado de suscripciones
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const date = formData.get('date') as string
    const price = parseFloat(formData.get('price') as string)

    const newSubscription: Subscription = {
      id: crypto.randomUUID(),
      title: name,
      category: category.toLocaleUpperCase(),
      nextRenewal: new Date(date),
      price: price,
      isRenews: false
    }

    setSubscriptions([...subscriptions, newSubscription])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>
            Add a new subscription to your list. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form id="form" onSubmit={(e) => { addSubscription(e) }} className="grid gap-6 py-4">
          {/* Subscription Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Subscription Name</Label>
            <Input id="name" name="name" placeholder="e.g., Netflix" required />
          </div>

          {/* Price & Billing Cycle */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <span className="absolute left-0 top-0 flex h-full w-7 items-center justify-center text-muted-foreground">$</span>
                <Input id="price" name="price" type="number" step="0.01" placeholder="15.99" className="pl-7" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billing-cycle">Billing Cycle</Label>
              <select
                id="billing-cycle"
                name="billing-cycle"
                className={cn(
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Next Billing Date */}
          <div className="grid gap-2">
            <Label htmlFor="date">Next Billing Date</Label>
            <Input id="date" name="date" type="date" className="block" required />
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              defaultValue=""
              required
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              <option value="" disabled>Select a category</option>
              {
                categories.map((category) => (
                  <option value={category.name} key={category.id}>
                    {category.name}
                  </option>
                ))
              }
            </select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}>Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white"
            >
              Save Subscription
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
