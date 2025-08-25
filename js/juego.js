let enJuego = false;
let animacionID = null;

export function iniciarJuego() {
  if (enJuego) return;
  enJuego = true;
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

export function generarCampo() {
  console.log('⚔️ Campo de batalla generado');
  // Acá podrías crear enemigos y mostrarlos en el canvas
}

function bucleJuego() {
  const canvas = document.getElementById('juegoCanvas');
  const ctx = canvas.getContext('2d');

  function loop() {
    if (!enJuego) return;

    // Limpiar y dibujar (más adelante agregar enemigos, jugador, etc.)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Próxima animación
    animacionID = requestAnimationFrame(loop);
  }

  loop();
}
