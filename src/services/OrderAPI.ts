import type { PenguinPlush, CreateOrderDTO } from "../models/plushOrder";

const BASE_URL = "http://localhost:8080/api/v1/penguins";

/**
 * Consulta el catálogo de peluches disponibles (GET /api/v1/penguins)
 */
export async function fetchCatalog(): Promise<PenguinPlush[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Error al obtener catálogo: HTTP ${response.status}`);
    }
    const data = await response.json();
    return data as PenguinPlush[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Ocurrió un error inesperado al consultar el catálogo.");
  }
}

/**
 * Envía la orden de compra a la subruta correcta (POST /api/v1/penguins/orders)
 * El backend retorna HTTP 201 sin cuerpo (ResponseEntity<Void>)
 */
export async function createOrder(dto: CreateOrderDTO): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dto)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error en el servidor: HTTP ${response.status}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("No se pudo completar el registro del pedido.");
  }
}