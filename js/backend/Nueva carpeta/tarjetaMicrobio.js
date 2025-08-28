// Muestra una tarjeta flotante con la información de un microbio en la posición del mouse
export function mostrarInfoMicrobioFlotante(microbio, x, y) {
  // 1. Elimina cualquier tarjeta flotante previa
  const existente = document.getElementById("tarjeta-microbio");
  if (existente) existente.remove();

  // 2. Crea el contenedor de la tarjeta
  const tarjeta = document.createElement("div");
  tarjeta.id = "tarjeta-microbio";
  tarjeta.className = "tarjeta-flotante";

  // 3. Llena la tarjeta con la información del microbio
  tarjeta.innerHTML = `
    <h4>🦠 ${microbio.nombre}</h4>
    <p><strong>Tipo:</strong> ${microbio.tipo}</p>
    <p><strong>Descripción:</strong> ${microbio.descripcion || 'Sin descripción'}</p>
    <p><strong>Tratamientos:</strong> ${
      Array.isArray(microbio.tratamientos)
        ? microbio.tratamientos.join(', ')
        : (microbio.tratamientos || 'N/A')
    }</p>
  `;

  // 4. Posiciona la tarjeta cerca del mouse
  tarjeta.style.position = "absolute";
  tarjeta.style.left = `${x + 20}px`;
  tarjeta.style.top = `${y - 30}px`;
  tarjeta.style.zIndex = 1000;

  // 5. Agrega la tarjeta al documento
  document.body.appendChild(tarjeta);

  // 6. Elimina la tarjeta automáticamente después de 5 segundos
  setTimeout(() => {
    if (tarjeta.parentNode) tarjeta.remove();
  }, 5000);
}