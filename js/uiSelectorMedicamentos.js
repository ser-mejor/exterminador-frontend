// uiSelectorMedicamentos.js
// Selector de medicamentos (versión <select>)
export function crearSelectorMedicamentos(medicamentos, callback) {
  const contenedor = document.getElementById("selectorMedicamentos");
  contenedor.innerHTML = ""; // limpiar antes de generar

  const select = document.createElement("select");
  select.id = "medicamentoSelect";
  select.classList.add("selector-estilo");

  // Opción inicial
  const opcionDefault = document.createElement("option");
  opcionDefault.value = "";
  opcionDefault.textContent = "Selecciona un medicamento";
  select.appendChild(opcionDefault);

  // Crear opciones según medicamentos disponibles
  medicamentos.forEach(med => {
    const option = document.createElement("option");
    option.value = med.nombre;
    option.textContent = med.nombre;
    select.appendChild(option);
  });

  // Detectar cambio
  select.addEventListener("change", () => {
    if (select.value) {
      callback(select.value);
    }
  });

  contenedor.appendChild(select);
}

