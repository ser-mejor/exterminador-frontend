// Función para mostrar información del microbio/enemigo en el panel del juego
export function mostrarInfoMicrobio(microbio) {
  const panel = document.getElementById("panel-info");

  const html = `
    <div class="tarjeta-microbio">
      <h3>🦠 ${microbio.nombre}</h3>
      <p><strong>🔬 Tipo:</strong> ${microbio.tipo}</p>
      <p><strong>📚 Descripción:</strong> ${microbio.descripcion}</p>
      <p><strong>💊 Tratamiento:</strong> ${Array.isArray(microbio.tratamiento) ? microbio.tratamiento.join(", ") : microbio.tratamiento}</p>
    </div>
  `;

  if (panel) {
    panel.innerHTML = html;
  } else {
    // Fallback si no hay panel en el HTML
    const infoTexto = `
      🦠 Microbio: ${microbio.nombre}
      🔬 Tipo: ${microbio.tipo}
      📚 Descripción: ${microbio.descripcion}
      💊 Tratamientos: ${microbio.tratamientos}
    `;
    console.log(infoTexto);
  }
}
