import { useEffect, useMemo, useState } from "react"
import { type Subscription, type Category } from '@/types/types'
import { Menu } from "lucide-react"
import { checkIfRenewalIsNear } from "@/lib/checkIfRenewalIsNear"
import { MAX_DAYS_TO_ANNOUNCE_RENEWAL } from '@/constants/index'
import { ButtonGroupDemo } from '@/components/ButtonGroup'
import { StatCard } from "@/components/StatCard"
import { Sidebar } from "@/components/Sidebar"
import { Layout } from "@/components/Layout"
import { CategoryDialog } from '@/components/CategoryDialog'
import { SubscriptionDialog } from "@/components/SubscriptionDialog"
import { SuscriptionCard } from "@/features/subscriptions/SuscriptionCard"
import { getCategories } from "./api/categories"
import { deleteSubscription, getSubscriptions } from "./api/subscriptions"
import SubscriptionsEmptyView from "@/components/SubscriptionsEmptyView"
export const SubscriptionPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  /**
   * 1 Importamos el Dialog
   * 2 Usar el componente Dialog en un componente, luego asignar las props de open y setOpen
   * 3 Creamos un estado para open y setOpen, y con esto indicamos al Dialog si se tiene que abrir o cerrar
   * 4 Con un boton abrimos el Dialog y para cerrar eso se encarga el Dialog internamente
   */

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data)
      } catch (error) {
        console.log("Error loading: ", error);
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const data = await getSubscriptions();
        const parsed = data.map((sub: Subscription) => ({
          ...sub,
          price: Number(sub.price)
        }))
        setSubscriptions(parsed)
      } catch (error) {
        console.log("Error loading subscriptions: ", error);
      }
    }
    loadSubscriptions()
  }, [])

  const totalMonthy = useMemo(() => {
    return subscriptions.reduce((total, subscription) => {
      return total + subscription.price
    }, 0)
  }, [subscriptions])

  const totalAnual = useMemo(() => {
    return totalMonthy * 12
  }, [totalMonthy])


  const upcomingRenewals = useMemo(() => {
    const today = new Date()
    const renewingSoon = subscriptions.filter((sub) => {
      const nextRenewalDate = new Date(sub.nextRenewal); // <-- convertir string a Date
      const diffMiliSeconds = nextRenewalDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffMiliSeconds / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= MAX_DAYS_TO_ANNOUNCE_RENEWAL;
    })
    return renewingSoon.length
  }, [subscriptions])

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Unknown"; // fallback si no existe
  };

  const filteredSubscriptions = useMemo(() => {
    if (selectedCategories.length === 0) return subscriptions;

    return subscriptions.filter(sub => selectedCategories.includes(sub.categoryId));
  }, [selectedCategories, subscriptions]);

  const handleDelete = async (id: number) => {
    await deleteSubscription(id)
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  }

  const handleEdit = () => {
    return;
  }

  return (
    <Layout>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        categories={categories}
        subscriptions={subscriptions}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/30">
        {/* Top Header (Optional, for mobile menu or page title) */}
        <header className="flex h-16 items-center border-b border-border bg-background/50 px-4 md:px-6 backdrop-blur-sm gap-4 justify-between">
          <button
            className="md:hidden p-2 -ml-2 hover:bg-accent rounded-md"
            onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">
            <a href="/">Dashboard</a>
          </h1>

          <ButtonGroupDemo
            setSubscriptionDialogOpen={setSubscriptionDialogOpen}
            setCategoryDialogOpen={setCategoryDialogOpen}
          />

        </header>
        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">

            {/* Stats Grid Placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard title="Total Monthly" value={totalMonthy} format="currency" />
              <StatCard title="Total Anual Cost" value={totalAnual} format="currency" />
              <StatCard title="Upcoming Renewals" value={upcomingRenewals} format="text" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Your Suscriptions</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredSubscriptions.length > 0 ? (
                  filteredSubscriptions.map((subscription) => (
                    <SuscriptionCard
                      key={subscription.id}
                      id={subscription.id}
                      title={subscription.title}
                      nextRenewal={subscription.nextRenewal}
                      category={getCategoryName(subscription.categoryId)}
                      price={subscription.price}
                      isRenews={checkIfRenewalIsNear(subscription.nextRenewal)}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))) : (
                  <SubscriptionsEmptyView
                    setCategoryDialogOpen={() => setSubscriptionDialogOpen(true)}
                    setSubscriptionDialogOpen={() => setCategoryDialogOpen(true)}
                  />
                )}
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
