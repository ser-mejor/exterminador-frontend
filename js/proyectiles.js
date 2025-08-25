
export const proyectiles = [];

// uiSelectorMedicamentos.js
export function crearSelectorMedicamentos(medicamentos, callback) {
  const selector = document.getElementById('selector-medicamentos');
  medicamentos.forEach(med => {
    const option = document.createElement('option');
    option.value = med;
    option.textContent = med;
    selector.appendChild(option);
  });
  selector.onchange = () => callback(selector.value);
}