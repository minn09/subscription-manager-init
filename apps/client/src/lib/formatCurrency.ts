export const formatCurrency = (
  amount: number,
  currency = "PEN",
  locale = "es-PE"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "No date";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return "Invalid date";

  return dateObj.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
