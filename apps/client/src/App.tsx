import { Homepage } from "@/features/landing/HomePage"
import { SubscriptionPage } from "@/features/subscriptions/SubscriptionPage"
import { NotFoundPage } from "@/components/404"

function App() {
  let page = <NotFoundPage />
  const currentPath = window.location.pathname
  if (currentPath === "/") {
    page = <Homepage />
  } else if (currentPath === "/subscriptions") {
    page = <SubscriptionPage />
  }

  return (
    <>
      {page}
    </>
  )
}

export default App
