
export function mostrarInfoMicrobio(microbio) {
  const info = document.getElementById('info');
  info.innerHTML = `
    <h3>${microbio.nombre} (${microbio.tipo})</h3>
    <p>${microbio.descripcion}</p>
    <p><strong>Tratamientos:</strong> ${microbio.tratamientos.join(', ')}</p>
  `;
}

export function mostrarSelectorMedicamentos(medicamentos, callbackSeleccion) {
  const contenedor = document.getElementById("selector-medicamentos");
  contenedor.innerHTML = ""; // Limpiar antes de volver a cargar

  medicamentos.forEach(med => {
    const boton = document.createElement("button");
    boton.textContent = med;  // Mostrar nombre del medicamento
    boton.classList.add("boton-medicamento"); // Clase para estilos
    boton.onclick = () => callbackSeleccion(med); // Llama a función cuando se selecciona
    contenedor.appendChild(boton);
  });
}
