import { useLocation } from "react-router";

export function DetailsPage() {
  const { state } = useLocation();

  return (
    <div>
      <h1>Detalles de la suscripción</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
