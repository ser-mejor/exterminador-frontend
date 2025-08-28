// Simulación de carga desde una base de datos JSON
export function cargarListados() {
  const microbios = [
    { nombre: 'E. coli' },
    { nombre: 'Staphylococcus aureus' },
    { nombre: 'Candida albicans' },
  ];

  const medicamentos = [
    'Amoxicilina',
    'Ciprofloxacina',
    'Fluconazol',
  ];

  const pruebas = [
    'ELISA',
    'Gram',
    'Cultivo bacteriano',
  ];

  llenarLista('lista-microorganismos', microbios.map(m => m.nombre));
  llenarLista('lista-medicamentos', medicamentos);
  llenarLista('lista-pruebas', pruebas);

  // También llenar el selector
  const selector = document.getElementById('selector-medicamentos');
  medicamentos.forEach(med => {
    const option = document.createElement('option');
    option.value = med;
    option.textContent = med;
    selector.appendChild(option);
  });
}

function llenarLista(id, elementos) {
  const ul = document.getElementById(id);
  ul.innerHTML = '';
  elementos.forEach(el => {
    const li = document.createElement('li');
    li.textContent = el;
    ul.appendChild(li);
  });
}
