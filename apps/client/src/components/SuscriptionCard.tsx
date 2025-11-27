import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/formatCurrency"
import { Siren } from "lucide-react"
import { getLogoByName } from "@/lib/logoByName"
import { cn } from "@/lib/utils"

type SuscriptionCardProps = {
  title: string,
  nextRenewal: Date,
  category: string,
  price: number,
  isRenews?: boolean
}

export const SuscriptionCard = ({ title, nextRenewal, category, price, isRenews }: SuscriptionCardProps) => {
  const Logo = getLogoByName(title);
  const daysToRenewal = 1;
  return (
    <Card className={cn("flex flex-col transition-all hover:shadow-md relative", {
      "border-yellow-500 bg-yellow-50/5": isRenews,
    })}>
      {isRenews && (
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/20 animate-in fade-in zoom-in duration-300">
            <Siren className="h-3 w-3" />
            Renews in {daysToRenewal} days
          </span>
        </div>
      )}

      <CardHeader className="flex flex-row items-center gap-4 pt-6 pb-4">
        <div className="bg-pink-50 rounded-2xl p-2.5 shrink-0">
          {Logo && <Logo className="h-8 w-8 text-pink-500" />}

        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-lg font-semibold truncate pr-4">{title}</h2>
          <p className="text-sm text-muted-foreground truncate">
            Next Renewal: {formatDate(nextRenewal)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-0">
        <span className="px-2.5 py-1 text-xs rounded-full bg-pink-50 text-pink-500 font-medium whitespace-nowrap">
          {category}
        </span>
        <div className="flex items-baseline gap-1">
          <p className="text-xl font-bold">{formatCurrency(price)}</p>
          <span className="text-xs text-muted-foreground">/mo</span>
        </div>
      </CardContent>
    </Card>
  );
};
