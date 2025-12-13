import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, RefreshCcw, Timer } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatCurrency";

function getDaysUntilRenewal(date: string | Date) {
  const renewalDate = new Date(date);
  const today = new Date();

  renewalDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = renewalDate.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function DetailsPage() {
  const { state } = useLocation();
  const s = state.subscription;

  const days = getDaysUntilRenewal(s.nextRenewal);

  // Badge dinámico según días
  const renderRenewalBadge = () => {
    if (days === 0) {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
          Se renueva hoy
        </Badge>
      );
    }
    if (days < 0) {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-700">
          Vencida hace {Math.abs(days)} días
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-blue-100 text-blue-700">
        Renueva en {days} días
      </Badge>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Detalles de la suscripción</h1>
        <Button variant="outline">Editar</Button>
      </div>

      {/* Card principal */}
      <Card className="shadow-sm border rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            {s.title}
          </CardTitle>

          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{state.categoryName}</Badge>
            {renderRenewalBadge()}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator />

          {/* Properties */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Precio</span>
              <span className="font-medium">{formatCurrency(s.price)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Próxima renovación</span>
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {formatDate(s.nextRenewal)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Renovación automática</span>
              <div className="flex items-center gap-2">
                <RefreshCcw className="h-4 w-4 text-muted-foreground" />

                {s.isRenews ? (
                  <Badge variant="outline" className="bg-green-100 text-green-700">
                    Activa
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-100 text-red-700">
                    Desactivada
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Next payment card */}
          <Card className="p-4 border rounded-xl bg-muted/40 space-y-2">
            <p className="text-sm text-muted-foreground">Próximo cobro estimado</p>

            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <p className="text-xl font-semibold">{formatCurrency(s.price)}</p>
            </div>

            <p className="text-xs text-muted-foreground">
              El {formatDate(s.nextRenewal)}
            </p>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
