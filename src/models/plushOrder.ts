// src/models/plushOrder.ts

// 1. Modelos de pingüinos permitidos (Pilar 1)
export const PenguinModel = {
  EMPEROR: "Pingüino Emperador",
  ADELIE: "Pingüino Adelia",
  GENTOO: "Pingüino Papúa",
  ROCKHOPPER: "Pingüino Penacho Amarillo",
  LITTLE_BLUE: "Pingüino Azul"
} as const;

export type PenguinModelType = typeof PenguinModel[keyof typeof PenguinModel];

// 2. Estados permitidos del pedido
export const OrderStatus = {
  PENDING: "PENDING",
  PREPARING: "PREPARING",
  SHIPPED: "SHIPPED",
  CANCELLED: "CANCELLED"
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

// 3. Contrato de datos estricto
export interface PlushOrder {
  id: string;
  customerName: string;
  penguinModel: PenguinModelType; // Tipo restringido a los pingüinos definidos arriba
  quantity: number;
  status: OrderStatusType;
}