// src/models/booking.ts

// 1. Reemplazo del enum por un objeto constante soluble
export const BookingStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED"
} as const;

// Definir el tipo basado en los valores del objeto anterior
export type BookingStatusType = typeof BookingStatus[keyof typeof BookingStatus];

// 2. Modelo de datos con tipos estrictos (Pilar 1)
export interface Booking {
  id: string;
  customerName: string;
  quantity: number;
  status: BookingStatusType; // Uso del tipo estricto
}