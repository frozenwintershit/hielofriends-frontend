// src/main.ts

// 1. Importación limpia de tipos y valores (Pilar 1)
import { 
  OrderStatus, 
  type PlushOrder, 
  type PenguinModelType 
} from "./models/plushOrder";

// ==========================================
// PILAR 2: Manejo del DOM y Formularios
// ==========================================
const orderForm = document.getElementById("form-reserva") as HTMLFormElement | null;

if (orderForm !== null) { // Guardia de nulidad estricta
  orderForm.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // Neutraliza la recarga nativa

    const nameInput = document.getElementById("txt-nombre") as HTMLInputElement | null;
    const modelSelect = document.getElementById("slc-modelo") as HTMLSelectElement | null;
    const quantityInput = document.getElementById("txt-cantidad") as HTMLInputElement | null;
    const errorBlock = document.getElementById("bloque-error");

    // Guardia de nulidad conjunta para los elementos del formulario
    if (!nameInput || !modelSelect || !quantityInput) return;

    const nameValue = nameInput.value.trim();
    const modelValue = modelSelect.value as PenguinModelType;
    const quantityValue = parseInt(quantityInput.value, 10);

    // Validación defensiva en el cliente
    if (nameValue.length === 0 || isNaN(quantityValue) || quantityValue <= 0) {
      if (errorBlock) {
        errorBlock.textContent = "Error: Ingrese un nombre y una cantidad válida de peluches.";
      }
      return;
    }

    if (errorBlock) errorBlock.textContent = "";

    // Creación del objeto bajo el contrato estricto de PlushOrder
    const nuevoPedido: PlushOrder = {
      id: Date.now().toString(),
      customerName: nameValue,
      penguinModel: modelValue,
      quantity: quantityValue,
      status: OrderStatus.PENDING
    };

    console.log("Pedido de pingüinos capturado:", nuevoPedido);
    
    // Limpiar formulario tras éxito
    orderForm.reset();
  });
}

// ==========================================
// PILAR 3: Arquitectura Asíncrona (Fetch)
// ==========================================
async function loadCatalog(): Promise<void> {
  const container = document.getElementById("contenedor-catalogo");
  if (!container) return; // Guardia de nulidad

  // 1. Feedback visual de carga inicial
  container.innerHTML = "<p>Cargando catálogo de pingüinos desde el servidor...</p>";

  try {
    const response = await fetch("http://localhost:3000/api/items");

    if (!response.ok) {
      throw new Error(`Error de servidor: Código HTTP ${response.status}`);
    }

    const data = await response.json();
    
    // Renderizado seguro de datos recibidos
    container.innerHTML = `
      <div>
        <h3>Catálogo Hielofriends</h3>
        <p><strong>Estado del catálogo:</strong> ${data.title || "Datos cargados correctamente"}</p>
      </div>
    `;

  } catch (error: unknown) {
    // Manejo seguro del tipo de error sin usar 'any'
    const errorMessage = error instanceof Error ? error.message : "Error desconocido de red";
    console.error("Fallo de red:", errorMessage);

    // Feedback visual ante fallos en pantalla
    container.innerHTML = `
      <div style="color: red; border: 1px solid red; padding: 10px; border-radius: 6px;">
        <p><strong>No fue posible conectar con el servidor de Hielofriends.</strong></p>
        <small>${errorMessage}</small>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadCatalog);
