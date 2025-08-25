export function mostrarInfoMicrobioFlotante(microbio, x, y) {
  const existente = document.getElementById("tarjeta-microbio");
  if (existente) existente.remove();

  const tarjeta = document.createElement("div");
  tarjeta.id = "tarjeta-microbio";
  tarjeta.className = "tarjeta-flotante";
  tarjeta.innerHTML = `
    <h4>🦠 ${microbio.nombre}</h4>
    <p><strong>Tipo:</strong> ${microbio.tipo}</p>
    <p><strong>Descripción:</strong> ${microbio.descripcion}</p>
    <p><strong>Tratamientos:</strong> ${
      Array.isArray(microbio.tratamientos) ? microbio.tratamientos.join(', ') : microbio.tratamientos
    }</p>
  `;

  tarjeta.style.left = `${x + 20}px`;
  tarjeta.style.top = `${y - 30}px`;

  document.body.appendChild(tarjeta);
  setTimeout(() => tarjeta.remove(), 5000);
}
