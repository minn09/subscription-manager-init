import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { Menu } from "lucide-react"

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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="h-4 w-1/2 rounded bg-muted animate-pulse mb-2"></div>
                  <div className="h-8 w-3/4 rounded bg-muted/50 animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Content Placeholder */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm min-h-[400px]">
              <div className="h-full w-full rounded-lg border-2 border-dashed border-muted flex items-center justify-center text-muted-foreground">
                Main Content Area
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default App
