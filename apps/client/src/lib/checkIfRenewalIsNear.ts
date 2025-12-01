// En checkIfRenewalIsNear.ts
import { MAX_DAYS_TO_ANNOUNCE_RENEWAL } from "../constants/index";

export const checkIfRenewalIsNear = (renewalDate: Date): boolean => {
  // Normalizar fechas a medianoche en hora local
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const renewal = new Date(renewalDate);
  renewal.setHours(0, 0, 0, 0);

  // Calcular la diferencia en milisegundos
  const diffTime = renewal.getTime() - today.getTime();

  // Convertir a días
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Retornar true si está dentro del rango y la fecha aún no ha pasado
  return diffDays >= 0 && diffDays <= MAX_DAYS_TO_ANNOUNCE_RENEWAL;
};

// Función helper para calcular días exactos (útil para mostrar)
export const getDaysUntilRenewal = (renewalDate: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const renewal = new Date(renewalDate);
  renewal.setHours(0, 0, 0, 0);

  const diffTime = renewal.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
