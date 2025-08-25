import { enemigos } from './enemigo.js';

export const compatibilidad = {
  "Ceftriaxona": ["bacteria"],
  "Amoxicilina": ["bacteria"],
  "Aciclovir": ["virus"],
  "Anfotericina B": ["hongo"],
  "Metronidazol": ["bacteria", "parasito"]
};

export function aplicarMedicamento(enemigo, indiceEnemigo) {
  const med = window.jugador?.medicamentoSeleccionado;
  const tipo = enemigo.tipo;

  if (compatibilidad[med]?.includes(tipo)) {
    console.log(`✅ ${med} es efectivo contra ${enemigo.nombre}`);
    enemigos.splice(indiceEnemigo, 1);
  } else {
    console.log(`❌ ${med} NO es efectivo contra ${enemigo.nombre}`);
    // Aquí puedes añadir efectos visuales o daño adicional

    
  }
}
