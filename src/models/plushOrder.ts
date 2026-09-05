// 1. Modelos de pingüinos permitidos
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

// 3. Representación del Value Object PlushPrice de Spring Boot
export interface PlushPrice {
  amount?: number;
  value?: number;
  currency?: string;
}

// 4. Contrato real para los elementos que retorna GET /api/v1/penguins
export interface PenguinPlush {
  id: string;
  model: string;
  price: PlushPrice | number;
  availableStock: number;
}

// 5. Contrato de datos estricto de la entidad completa de pedidos
export interface PlushOrder {
  id: string;
  customerName: string;
  penguinModel: PenguinModelType;
  quantity: number;
  status: OrderStatusType;
}

// 6. DTO exacto para la creación de órdenes (POST /api/v1/penguins/orders)
export interface CreateOrderDTO {
  plushId: string;
  quantity: number;
  customerEmail: string;
}