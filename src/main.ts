import { BookingStatus, type Booking } from "./models/booking";

// ==========================================
// PILAR 2: Manejo del DOM y Formularios
// ==========================================
const bookingForm = document.getElementById("form-reserva") as HTMLFormElement | null;

if (bookingForm !== null) { // Guardia de nulidad
  bookingForm.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // Intercepta el envío nativo

    const nameInput = document.getElementById("txt-nombre") as HTMLInputElement;
    const quantityInput = document.getElementById("txt-cantidad") as HTMLInputElement;
    const errorBlock = document.getElementById("bloque-error");

    const nameValue = nameInput.value.trim();
    const quantityValue = parseInt(quantityInput.value);

    // Validación en el cliente
    if (nameValue.length === 0 || isNaN(quantityValue) || quantityValue <= 0) {
      if (errorBlock) errorBlock.textContent = "Error: Ingrese datos válidos.";
      return;
    }

    if (errorBlock) errorBlock.textContent = "";

    const nuevaReserva: Booking = {
      id: Date.now().toString(),
      customerName: nameValue,
      quantity: quantityValue,
      status: BookingStatus.PENDING
    };

    console.log("Reserva capturada:", nuevaReserva);
  });
}

// ==========================================
// PILAR 3: Arquitectura Asíncrona (Fetch)
// ==========================================
async function loadCatalog(): Promise<void> {
  const container = document.getElementById("contenedor-catalogo");
  if (!container) return; // Guardia de nulidad

  // 1. Feedback visual previo
  container.innerHTML = "<p>Cargando datos desde el servidor...</p>";

  try {
    // Reemplaza esta URL con la API que corresponda a tu proyecto o backend
    const response = await fetch("http://localhost:3000/api/items");

    if (!response.ok) {
      throw new Error(`Código HTTP ${response.status}`);
    }

    const data = await response.json();
    container.innerHTML = `<p><strong>Datos recibidos:</strong> ${data.title}</p>`;

  } catch (error: any) {
    // Feedback visual en pantalla ante error
    console.error("Fallo de red:", error);
    container.innerHTML = `
      <div style="color: red;">
        <p>No fue posible obtener los datos.</p>
        <small>${error.message}</small>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadCatalog);
