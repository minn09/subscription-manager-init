import { Menu, CirclePlus } from "lucide-react"
import { StatCard } from "./StatCard"
import { SuscriptionCard } from "./SuscriptionCard"
import { Button } from "./ui/button"
import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Layout } from "./Layout"
import { SubscriptionDialog } from "./SubscriptionDialog"
import { type Subscription, type Category } from './types'
import { ButtonGroupDemo } from '@/components/ButtonGroup'
import { CategoryDialog } from './CategoryDialog'

export const SubscriptionPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  /**
   * 1 Importamos el Dialog
   * 2 Usar el componente Dialog en un componente, luego asignar las props de open y setOpen
   * 3 Creamos un estado para open y setOpen, y con esto indicamos al Dialog si se tiene que abrir o cerrar
   * 4 Con un boton abrimos el Dialog y para cerrar eso se encarga el Dialog internamente
   */

  return (
    <Layout>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        categories={categories}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/30">
        {/* Top Header (Optional, for mobile menu or page title) */}
        <header className="flex h-16 items-center border-b border-border bg-background/50 px-4 md:px-6 backdrop-blur-sm gap-4 justify-between">
          <button
            className="md:hidden p-2 -ml-2 hover:bg-accent rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">
            <a href="/">Dashboard</a>
          </h1>
          <ButtonGroupDemo />

        </header>

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">

            {/* Stats Grid Placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard title="Total Monthly" value={128.75} format="currency" />
              <StatCard title="Total Anual Cost" value={1545.00} format="currency" />
              <StatCard title="Upcoming Renewals" value={3} format="text" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Your Suscriptions</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {
                  subscriptions.map((subscription) => (
                    <SuscriptionCard
                      key={subscription.id}
                      title={subscription.title}
                      nextRenewal={subscription.nextRenewal}
                      category={subscription.category}
                      price={subscription.price}
                      isRenews={subscription.isRenews} />
                  ))
                }

              </div>
            </div>

            {/* Content Placeholder */}
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
            <SubscriptionDialog
              open={subscriptionDialogOpen}
              setOpen={setSubscriptionDialogOpen}
              setSubscriptions={setSubscriptions}
              subscriptions={subscriptions}
              categories={categories}
            />

            <CategoryDialog
              open={categoryDialogOpen}
              setOpen={setCategoryDialogOpen}
              setCategories={setCategories}
              categories={categories}
            />
          </div>
        </div>
      </main>
    </Layout>
  )
}
