function obtenerDocumentos() {
  fetch('http://localhost:3000/verificar')
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('contenedor-datos');
      if (!contenedor) return;
      contenedor.innerHTML = '';
      data.forEach(doc => {
        const div = document.createElement('div');
        div.className = 'tarjeta-microbio';
        div.innerHTML = `
          <h4>${doc.nombre}</h4>
          <p><strong>Tipo:</strong> ${doc.tipo}</p>
          <p><strong>Características:</strong> ${(doc.caracteristicas || []).join(', ')}</p>
          <p><strong>Tratamiento:</strong> ${(doc.tratamiento || []).join(', ')}</p>
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error al obtener documentos:", err);
    });
}
const btn = document.getElementById('btn-ver-datos');
if (btn) btn.addEventListener('click', obtenerDocumentos);