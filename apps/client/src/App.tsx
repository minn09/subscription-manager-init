import { Homepage } from "@/features/landing/HomePage"
import { SubscriptionPage } from "@/features/subscriptions/SubscriptionPage"
import { DetailsPage } from '@/components/DetailsPage'
import { NotFoundPage } from "@/components/404"
import { Routes, Route } from "react-router"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/subscriptions" element={<SubscriptionPage />} />
      <Route path="/subscriptions/details/:id" element={<DetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
