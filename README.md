# HieloFriends - Frontend Interactivo (Hito 2)

Este proyecto corresponde al desarrollo de la interfaz visual e interactiva para la plataforma de adopción y venta de peluches de pingüinos **HieloFriends**. El objetivo de esta etapa es abandonar los datos estáticos locales para demostrar el dominio en la construcción de interfaces dinámicas, manipulación segura del DOM, tipado estricto en TypeScript y la gestión de peticiones asíncronas con retroalimentación en tiempo real.

---

## Pilares de Desarrollo Implementados

1. **Modelado de Datos Estricto:** Eliminación absoluta del tipo `any`. Definición de contratos de datos herméticos (`PlushOrder`, `PenguinModel`, estados de orden) mediante interfaces TypeScript y objetos constantes para el control de estados de la interfaz.
2. **Manipulación Segura del DOM:** Captura de nodos del navegador aplicando guardias de nulidad (`if !== null`) y aserciones de tipo especializadas (`as HTMLInputElement`, `as HTMLSelectElement`) para garantizar la robustez en tiempo de ejecución. Neutralización de recargas en formularios mediante `preventDefault()`.
3. **Arquitectura Asíncrona y Feedback:** Consumo de datos remotos mediante la sintaxis moderna `async/await`, control de flujo con bloques `try/catch` validando el estado de las respuestas HTTP (`response.ok`), e implementación de spinners/indicadores de carga y mensajes descriptivos (éxito o error de inventario) en pantalla.

---

## Tecnologías Utilizadas

- **Vite:** Entorno de desarrollo y empaquetador ultrarrápido.
- **TypeScript Vanilla:** Lógica tipada de forma estricta sin dependencias de frameworks UI pesados.
- **CSS3 / Vanilla UI:** Diseño temático frío y responsivo para el catálogo de pingüinos.
- **Módulos nativos ES6.**

---

## Comandos de Instalación y Ejecución

Asegúrate de estar posicionado dentro de la carpeta del frontend en tu terminal antes de 
ejecutar los siguientes comandos:

1. Instalar dependencias del proyecto:
   ```bash
   npm install

2. Para ejecutar el servidor de desarrollo:
   ```bash
   npm run dev

3. Para ejecutar la verificación estricta:
   ```bash
   npm run build


