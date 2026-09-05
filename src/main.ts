import { 
  type PenguinPlush, 
  type CreateOrderDTO,
  type PlushPrice
} from "./models/plushOrder";
import { fetchCatalog, createOrder } from "./services/OrderAPI";

// ==========================================
// REFERENCIAS AL DOM Y GUARDIAS
// ==========================================
const orderForm = document.getElementById("form-reserva") as HTMLFormElement | null;
const plushSelect = document.getElementById("slc-peluche") as HTMLSelectElement | null;
const emailInput = document.getElementById("txt-email") as HTMLInputElement | null;
const quantityInput = document.getElementById("txt-cantidad") as HTMLInputElement | null;
const errorBlock = document.getElementById("bloque-error") as HTMLElement | null;
const catalogContainer = document.getElementById("contenedor-catalogo") as HTMLElement | null;

// ==========================================
// UTILIDADES Y FORMATEO
// ==========================================
function formatPrice(price: PlushPrice | number): string {
  if (typeof price === "number") {
    return `$${price.toLocaleString("es-CL")}`;
  }
  const amount = price.amount ?? price.value ?? 0;
  const currency = price.currency ?? "CLP";
  return `$${amount.toLocaleString("es-CL")} ${currency}`;
}

// ==========================================
// RENDERIZADO Y CARGA ASÍNCRONA (GET)
// ==========================================
function renderPlushCard(plush: PenguinPlush): string {
  return `
    <article style="border: 1px solid #ccc; padding: 12px; margin-bottom: 10px; border-radius: 6px;">
      <h4>${plush.model}</h4>
      <p><strong>Precio:</strong> ${formatPrice(plush.price)}</p>
      <p><strong>Stock disponible:</strong> ${plush.availableStock}</p>
      <small style="color: #666;">ID: ${plush.id}</small>
    </article>
  `;
}

function populatePlushSelect(plushies: PenguinPlush[]): void {
  if (!plushSelect) return;

  if (plushies.length === 0) {
    plushSelect.innerHTML = `<option value="" disabled selected>No hay peluches disponibles</option>`;
    return;
  }

  plushSelect.innerHTML = plushies
    .map(
      (p) =>
        `<option value="${p.id}" ${p.availableStock === 0 ? "disabled" : ""}>
          ${p.model} - ${formatPrice(p.price)} (Stock: ${p.availableStock})
        </option>`
    )
    .join("");
}

async function loadCatalog(): Promise<void> {
  if (!catalogContainer) return;

  catalogContainer.innerHTML = "<p>Cargando catálogo desde el servidor...</p>";

  try {
    const plushies = await fetchCatalog();

    if (plushies.length === 0) {
      catalogContainer.innerHTML = "<p>No hay peluches registrados actualmente.</p>";
      if (plushSelect) {
        plushSelect.innerHTML = `<option value="" disabled selected>Catálogo vacío</option>`;
      }
      return;
    }

    // 1. Renderizar tarjetas de stock
    catalogContainer.innerHTML = plushies.map(renderPlushCard).join("");

    // 2. Poblar dinámicamente las opciones del select
    populatePlushSelect(plushies);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error de comunicación con el servidor.";
    catalogContainer.innerHTML = `
      <div style="color: red; border: 1px solid red; padding: 10px; border-radius: 6px;">
        <p><strong>Fallo al cargar catálogo de HieloFriends:</strong></p>
        <small>${message}</small>
      </div>
    `;
  }
}

// ==========================================
// CONTROLADOR DEL FORMULARIO (POST)
// ==========================================
if (orderForm !== null) {
  orderForm.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    if (!emailInput || !plushSelect || !quantityInput) return;

    const emailValue = emailInput.value.trim();
    const plushIdValue = plushSelect.value;
    const quantityValue = parseInt(quantityInput.value, 10);

    // Validación defensiva en cliente
    if (emailValue.length === 0 || !plushIdValue || isNaN(quantityValue) || quantityValue <= 0) {
      if (errorBlock) {
        errorBlock.style.color = "red";
        errorBlock.textContent = "Error: Ingrese un correo válido, seleccione un peluche y una cantidad mayor a 0.";
      }
      return;
    }

    const payload: CreateOrderDTO = {
      customerEmail: emailValue,
      plushId: plushIdValue,
      quantity: quantityValue
    };

    try {
      if (errorBlock) {
        errorBlock.style.color = "blue";
        errorBlock.textContent = "Guardando pedido en el servidor...";
      }

      // 1. Envío POST a Spring Boot (/api/v1/penguins/orders)
      await createOrder(payload);

      if (errorBlock) {
        errorBlock.style.color = "green";
        errorBlock.textContent = "¡Pedido registrado exitosamente!";
      }

      // 2. Limpieza de inputs (manteniendo catálogo poblado)
      emailInput.value = "";
      quantityInput.value = "1";

      // 3. Refresco reactivo del catálogo y stock
      await loadCatalog();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al registrar el pedido.";
      if (errorBlock) {
        errorBlock.style.color = "red";
        errorBlock.textContent = message;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", loadCatalog);
