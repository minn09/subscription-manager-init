import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatCurrency"

type StatCardProps = {
  title: string,
  value: number,
  format: 'currency' | 'text'
}

export const StatCard = ({ title, value, format }: StatCardProps) => {
  let displayValue = ''

  if (format === 'currency') {
    displayValue = formatCurrency(value);
  } else {
    displayValue = value.toString();
  }
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">{title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{displayValue}</p>
      </CardContent>
    </Card>
  );
};
