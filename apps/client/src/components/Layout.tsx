import { Toaster } from "@/components/ui/sonner"
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {children}
      <Toaster theme="light" />
    </div>
  )
}
