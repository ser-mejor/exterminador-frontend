function obtenerDocumentos() {
  fetch('http://localhost:3000/verificar')
    .then(res => res.json())
    .then(data => {
      console.log("Documentos desde MongoDB Atlas:", data);
      // Aquí podrías mostrarlos en una tabla, tarjeta, etc.
    })
    .catch(err => {
      console.error("Error al obtener documentos:", err);
    });
}
document.getElementById('btn-ver-datos').addEventListener('click', obtenerDocumentos);
