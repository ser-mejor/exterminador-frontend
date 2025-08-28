import { proyectiles } from './proyectiles.js';

export class Jugador {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.radio = 15;
    this.medicamentoSeleccionado = null;
  }
  actualizar() {
    this.x += this.dx;
    this.y += this.dy;
  }
  dibujar(ctx) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fill();
  }
  disparar(xObjetivo, yObjetivo) {
    if (!this.medicamentoSeleccionado) return;
    const angulo = Math.atan2(yObjetivo - this.y, xObjetivo - this.x);
    proyectiles.push({
      x: this.x,
      y: this.y,
      dx: Math.cos(angulo) * 5,
      dy: Math.sin(angulo) * 5,
      medicamento: this.medicamentoSeleccionado,
      actualizar() { this.x += this.dx; this.y += this.dy; },
      dibujar(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }
  colisionaCon(enemigo) {
    const dist = Math.hypot(this.x - enemigo.x, this.y - enemigo.y);
    return dist < this.radio + enemigo.radio;
  }
}
