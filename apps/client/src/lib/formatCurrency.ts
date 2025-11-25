export const formatCurrency = (amount: number, currency = 'PEN', locale = 'es-PE') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
