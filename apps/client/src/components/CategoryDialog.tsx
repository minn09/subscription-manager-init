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
import type { Category } from "@/types/types"

type CategoryDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  setCategories: (categories: Category[]) => void
  categories: Category[]
}

export function CategoryDialog({ open, setOpen, setCategories, categories }: CategoryDialogProps) {

  const addCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const color = formData.get('color') as string

    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: name,
      color: color
    }
    setCategories([...categories, newCategory])

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to your list. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form id="form" onSubmit={(e) => { addCategory(e) }} className="grid gap-6 py-4">
          {/* Category Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" name="name" placeholder="e.g., Entertaiment" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <Input id="color" type="color" name="color" required />
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
              Save Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
