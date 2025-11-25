import { Button } from "./ui/button"

export const Homepage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold">Homepage</div>
        <Button className="mt-4">
          <a href="/subscriptions">Go to Subscriptions</a>
        </Button>
      </div>
    </>
  )
}
