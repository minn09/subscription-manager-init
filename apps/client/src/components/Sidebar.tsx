import {
  LayoutDashboard,
  Calendar,
  Download,
  Upload,
  Search,
  Settings,
  CreditCard,
  PieChart,
  X,
  type LucideIcon
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Category, Subscription } from "@/types/types"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  categories: Category[]
  subscriptions: Subscription[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
}

export function Sidebar({ isOpen = false, onClose, categories, subscriptions, selectedCategories, onCategoryChange }: SidebarProps) {
  const countCategories = (category: string) => {
    return subscriptions.filter(sub => sub.category.toLowerCase() === category.toLowerCase()).length
  }

  const handleCategoryToggle = (categoryName: string) => {
    const lowerCaseName = categoryName.toLowerCase()
    if (selectedCategories.includes(lowerCaseName)) {
      onCategoryChange(selectedCategories.filter(cat => cat !== lowerCaseName))
    } else {
      onCategoryChange([...selectedCategories, lowerCaseName])
    }
  }

  const sidebarContent = (
    <>
      {/* Header / Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border/50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-400">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400 text-white">
            <CreditCard className="h-5 w-5" />
          </div>
          <span>SubManager</span>
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-sidebar-accent/50 border-sidebar-border focus-visible:ring-sidebar-ring"
          />
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <nav className="flex flex-col gap-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Calendar} label="Calendar" />
          <NavItem icon={PieChart} label="Analytics" />

          <div className="my-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Categories
          </div>

          <div className="space-y-1">
            {categories.map((categorie) => (
              <CategoryItem
                key={categorie.id}
                label={categorie.name}
                count={countCategories(categorie.name)}
                color={categorie.color}
                isSelected={selectedCategories.includes(categorie.name.toLowerCase())}
                onToggle={() => handleCategoryToggle(categorie.name)}
              />
            ))}
          </div>
        </nav>
      </div>
      {/* Footer Actions */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Download className="h-4 w-4" />
          Export Data
        </button>
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <Upload className="h-4 w-4" />
          Import Data
        </button>

        <div className="mt-4 flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
          <div className="h-9 w-9 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Pro Plan</span>
          </div>
          <Settings className="ml-auto h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:flex md:w-72 md:h-full md:flex-col md:border-r md:border-sidebar-border md:bg-sidebar">
        {sidebarContent}
      </aside>

      {/* ===== MOBILE SIDEBAR ===== */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 h-screen flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

function NavItem({ icon: Icon, label, active = false }: { icon: LucideIcon, label: string, active?: boolean }) {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 group",
        active
          ? "bg-blue-400 text-white shadow-sm"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className={cn("h-4 w-4", active ? "text-white" : "text-muted-foreground group-hover:text-sidebar-accent-foreground")} />
      {label}
    </a>
  )
}

function CategoryItem({ label, count, color, isSelected, onToggle }: { label: string, count: number, color: string, isSelected: boolean, onToggle: () => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group">
      <div className="flex items-center gap-3">
        <div className={"h-2 w-2 rounded-full"} style={{ backgroundColor: color }} />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground/50 group-hover:text-muted-foreground">{count}</span>
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-sidebar-border bg-transparent text-blue-400 focus:ring-sidebar-ring"
          checked={isSelected}
          onChange={onToggle}
        />
      </div>
    </label>
  )
}
