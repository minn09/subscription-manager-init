import { Button } from "./ui/button"
import { Pencil } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Category } from '@/types/types'
import { useState } from "react"
import type { UpdateSubscription } from "@/types/types";

type Props = {
  id: number;
  defaultValues?: {
    title: string;
    price: number;
    categoryId: number;
    nextRenewal: Date;
  }
  onEdit: (id: number, data: UpdateSubscription) => void;
  categories: Category[]
}
export function EditSubscriptionDialog({
  id,
  onEdit,
  categories,
  defaultValues
}: Props) {

  const [open, setOpen] = useState(false)

  const renewalDate = defaultValues?.nextRenewal
    ? new Date(defaultValues.nextRenewal)
    : null;

  const [form, setForm] = useState({
    title: defaultValues?.title ?? "",
    price: defaultValues?.price ?? 0,
    categoryId: defaultValues?.categoryId ?? 1,
    nextRenewal: renewalDate
      ? renewalDate.toISOString().substring(0, 10)
      : "",
  });


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: name === "price" || name === "categoryId" ? Number(value) : value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload: UpdateSubscription = {
      title: form.title,
      price: Number(form.price),
      categoryId: Number(form.categoryId),
      nextRenewal: new Date(form.nextRenewal),
    }
    console.log(payload);

    onEdit(id, payload)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-500 hover:bg-blue-400"
          size="icon-sm"
          onClick={() => setOpen(true)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit subscription</DialogTitle>
            <DialogDescription>
              Update the fields you want to change.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nextRenewal">Next Billing Date</Label>
              <Input
                id="nextRenewal"
                name="nextRenewal"
                type="date"
                value={form.nextRenewal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categoryId">Category</Label>
              <select
                id="categoryId"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="flex h-9 w-full rounded-md border px-3 py-1"
              >
                {categories.map(cat => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


