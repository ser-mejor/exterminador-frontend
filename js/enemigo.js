export const enemigos = [];

export class Enemigo {
  constructor(nombre, tipo, x, y, dx, dy) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radio = 12;
  }
  actualizar() {
    this.x += this.dx;
    this.y += this.dy;
  }
  dibujar(ctx) {
    const colores = {
      bacteria: 'green',
      virus: 'red',
      hongo: 'orange',
      parasito: 'purple'
    };
    ctx.fillStyle = colores[this.tipo] || 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function generarEnemigos(cantidad, maxX, maxY) {
  enemigos.length = 0;
  const tipos = ['bacteria', 'virus', 'hongo', 'parasito'];
  for (let i = 0; i < cantidad; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    enemigos.push(new Enemigo(
      'Microbio-' + i,
      tipo,
      Math.random() * maxX,
      Math.random() * maxY,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ));
  }
}
