import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { CirclePlus, Menu } from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { SuscriptionCard } from "@/components/SuscriptionCard"
import { Button } from "./components/ui/button"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/30">
        {/* Top Header (Optional, for mobile menu or page title) */}
        <header className="flex h-16 items-center border-b border-border bg-background/50 px-4 md:px-6 backdrop-blur-sm gap-4">
          <button
            className="md:hidden p-2 -ml-2 hover:bg-accent rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
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
                <SuscriptionCard title="Netflix" nextRenewal="2026-10-28" tag={'Entertaiment'} price={15.49} isRenews />
                <SuscriptionCard title="Spotify" nextRenewal="2026-11-12" tag={'Entertaiment'} price={9.99} />
                <SuscriptionCard title="Youtube" nextRenewal="2026-11-24" tag={'Entertaiment'} price={12.99} />
                <SuscriptionCard title="Cursor" nextRenewal="2026-12-15" tag={'Productivity'} price={20.99} />
                <SuscriptionCard title="Vercel" nextRenewal="2026-12-20" tag={'Software'} price={15.00} />
                <SuscriptionCard title="Figma" nextRenewal="2026-12-20" tag={'Software'} price={12.00} />

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
                <Button className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-6">
                  Add Subscription
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default App
