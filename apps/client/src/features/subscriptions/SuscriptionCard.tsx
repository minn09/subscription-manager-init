import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/formatCurrency"
import { HelpCircle, Siren } from "lucide-react"
import { LOGOS } from "@/lib/logoByName"
import { cn } from "@/lib/utils"
import { MAX_DAYS_TO_ANNOUNCE_RENEWAL } from '@/constants/index'
// import { getDaysUntilRenewal } from "@/lib/checkIfRenewalIsNear"

type SuscriptionCardProps = {
  title: string,
  nextRenewal: Date,
  category: string,
  price: number,
  isRenews?: boolean
}
import { type SVG } from '@/types/svgl'
import { useState, useEffect } from "react"

export const SuscriptionCard = ({ title, nextRenewal, category, price, isRenews }: SuscriptionCardProps) => {

  // console.log('=== SuscriptionCard:', title, '===');
  // console.log('Today:', new Date().toLocaleDateString());
  // console.log('Renewal:', nextRenewal.toLocaleDateString());
  // console.log('Days until:', getDaysUntilRenewal(nextRenewal));
  // console.log('isRenews:', isRenews);
  const Logo = LOGOS[title.toLowerCase()] ?? HelpCircle;
  const today = new Date()
  // Calcular cuántos días FALTAN
  const nextRenewalDate = new Date(nextRenewal); // <-- convertir string a Date
  const diffMiliSeconds = nextRenewalDate.getTime() - today.getTime()
  const daysToRenewal = Math.ceil(diffMiliSeconds / (1000 * 60 * 60 * 24))
  const [svg, setSVG] = useState<SVG>()

  useEffect(() => {
    const loadData = async () => {
      try {
        const firstWord = (title ?? "")
          .trim()
          .split(" ")
          .filter(Boolean)[0] ?? "";
        const result = await fetch(`https://api.svgl.app/?search=${firstWord}`);

        const svgLists: SVG[] = await result.json();

        if (!svgLists || svgLists.length === 0) return;

        const svgRaw = svgLists[0]
        const route =
          typeof svgRaw.route === 'string'
            ? svgRaw.route
            : svgRaw.route.light || svgRaw.route.dark

        setSVG({ ...svgRaw, route })
      } catch (error) {
        console.log("Error loading: ", error);
      }
    };
    loadData();
  }, [title]);

  return (
    <Card className={cn("flex flex-col transition-all hover:shadow-md relative", {
      "border-yellow-500 bg-yellow-50/5": isRenews && daysToRenewal >= 0 && daysToRenewal <= MAX_DAYS_TO_ANNOUNCE_RENEWAL,
    })}>
      {(isRenews && daysToRenewal >= 0 && daysToRenewal <= MAX_DAYS_TO_ANNOUNCE_RENEWAL) && (
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/20 animate-in fade-in zoom-in duration-300">
            <Siren className="h-3 w-3" />
            {daysToRenewal === 0 ? "Today it's your turn to renew 🥲" : `Renews in ${daysToRenewal} days 😁`}

          </span>
        </div>
      )}

      <CardHeader className="flex flex-row items-center gap-4 pt-6 pb-4">
        <div className="bg-pink-50 rounded-2xl p-2.5 shrink-0">
          {svg ? (
            <img src={`${svg.route}`} width={32} height={32} />
          ) : (
            <Logo className="h-8 w-8 text-pink-500" />
          )}
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
