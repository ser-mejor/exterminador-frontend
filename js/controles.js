let medicamentoSeleccionado = 'Ceftriaxona'; // valor por defecto

export function setMedicamentoSeleccionado(nombre) {
  medicamentoSeleccionado = nombre;
}

export function getMedicamentoSeleccionado() {
  return medicamentoSeleccionado;
}

// Asocia la barra espaciadora a lanzar un proyectil
export function configurarControles(jugador, proyectiles, ctx, lanzarProyectil) {
  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') jugador.mover(-10);
    if (e.code === 'ArrowRight') jugador.mover(10);
    if (e.code === 'Space') {
      if (lanzarProyectil) lanzarProyectil();
    }
  });
}

