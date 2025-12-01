import {
  MoreHorizontalIcon,
  Tags,
  CreditCard
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"

type Props = {
  setSubscriptionDialogOpen: (status: boolean) => void,
  setCategoryDialogOpen: (status: boolean) => void
}

export function ButtonGroupDemo({ setSubscriptionDialogOpen, setCategoryDialogOpen }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" onClick={() => setMenuOpen(true)}>Add</Button>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More Options">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => {
                setSubscriptionDialogOpen(true);
                setMenuOpen(false);
              }}>
                <CreditCard />
                Add Subscription
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setCategoryDialogOpen(true);
                setMenuOpen(false);
              }}>
                <Tags />
                Add Category
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
