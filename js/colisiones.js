import { proyectiles } from './proyectiles.js';
import { enemigos } from './enemigo.js';
import { aplicarMedicamento } from './compatibilidad.js';

export function detectarColisiones() {
  for (let iP = proyectiles.length - 1; iP >= 0; iP--) {
    for (let iE = enemigos.length - 1; iE >= 0; iE--) {
      const p = proyectiles[iP];
      const enemigo = enemigos[iE];
      const dx = p.x - enemigo.x;
      const dy = p.y - enemigo.y;
      const distancia = Math.sqrt(dx * dx + dy * dy);
      if (distancia < enemigo.radio) {
        aplicarMedicamento(enemigo, iE);
        proyectiles.splice(iP, 1);
        break;
      }
    }
  }
}
