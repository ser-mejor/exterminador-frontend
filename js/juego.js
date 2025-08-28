import { enemigos, generarEnemigos } from './enemigo.js';

let enJuego = false;
let animacionID = null;
let jugador = { x: 400, y: 300, radio: 20 };

export function iniciarJuego() {
  if (enJuego) return;
  enJuego = true;
  generarEnemigos(5, 800, 600);
  bucleJuego();
  console.log('🎮 Juego iniciado');
}

export function pausarJuego() {
  enJuego = false;
  cancelAnimationFrame(animacionID);
  console.log('⏸️ Juego pausado');
}

export function continuarJuego() {
  if (enJuego) return;
  enJuego = true;
  bucleJuego();
  console.log('▶️ Juego reanudado');
}

function bucleJuego() {
  const canvas = document.getElementById('juegoCanvas');
  const ctx = canvas.getContext('2d');

  function loop() {
    if (!enJuego) return;

    // Limpiar y dibujar fondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar jugador
    ctx.beginPath();
    ctx.arc(jugador.x, jugador.y, jugador.radio, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Dibujar enemigos y actualizarlos
    enemigos.forEach(e => {
      e.actualizar();
      e.dibujar(ctx);
    });

    // Próxima animación
    animacionID = requestAnimationFrame(loop);
  }

  loop();
}