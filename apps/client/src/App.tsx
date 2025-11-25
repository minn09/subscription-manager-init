import { Homepage } from "@/components/HomePage"
import { SubscriptionPage } from "@/components/SubscriptionPage"
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
