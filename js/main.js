// Importación de módulos
import { Jugador } from './jugador.js';
import { enemigos, generarEnemigos } from './enemigo.js';
import { proyectiles } from './proyectiles.js';
import { crearSelectorMedicamentos } from './backend/uiSelectorMedicamentos.js';
import { mostrarInfoMicrobio } from './backend/uiMicrobioInfo.js';
import { detectarColisiones } from './colisiones.js';
import { iniciarJuego, pausarJuego, continuarJuego, generarCampo } from './juego.js';
import { cargarListados } from './backend/listados.js';
import { mostrarInfoMicrobioFlotante } from './ui/tarjetaMicrobio.js';
import { iniciarJuego, pausarJuego, continuarJuego, generarCampo } from './juego.js';

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-iniciar').onclick = iniciarJuego;
  document.getElementById('btn-pausar').onclick = pausarJuego;
  document.getElementById('btn-continuar').onclick = continuarJuego;
  document.getElementById('btn-generar-campo').onclick = generarCampo;
});

// URL del backend (cambia por tu dominio real en la nube)
const BACKEND_URL = 'https://tu-backend.onrender.com';

// Estado del juego
let jugador;
let juegoActivo = false;
let ctx, canvas;

// ============================
// Inicialización del juego
// ============================
window.addEventListener('DOMContentLoaded', () => {
  verificarConexionBackend();
  cargarListados();
  configurarBotones();
  inicializarCanvas();
  inicializarJugador();
  inicializarSelectorMedicamentos();
  inicializarControles();
  inicializarEventosCanvas();
});

// ============================
// Configuraciones iniciales
// ============================
function inicializarCanvas() {
  canvas = document.getElementById('juegoCanvas');
  ctx = canvas.getContext('2d');
}

function inicializarJugador() {
  jugador = new Jugador(400, 300);
}

function inicializarSelectorMedicamentos() {
  const medicamentosDisponibles = [
    "Ceftriaxona",
    "Amoxicilina",
    "Aciclovir",
    "Anfotericina B",
    "Metronidazol"
  ];
  crearSelectorMedicamentos(medicamentosDisponibles, (med) => {
    jugador.medicamentoSeleccionado = med;
  });
}

function inicializarControles() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') jugador.dy = -2;
    if (e.key === 'ArrowDown') jugador.dy = 2;
    if (e.key === 'ArrowLeft') jugador.dx = -2;
    if (e.key === 'ArrowRight') jugador.dx = 2;
  });

  document.addEventListener('keyup', (e) => {
    if (["ArrowUp", "ArrowDown"].includes(e.key)) jugador.dy = 0;
    if (["ArrowLeft", "ArrowRight"].includes(e.key)) jugador.dx = 0;
  });
}

function inicializarEventosCanvas() {
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Mostrar info flotante si se clickea un enemigo
    enemigos.forEach(enemigo => {
      if (
        clickX >= enemigo.x && clickX <= enemigo.x + enemigo.ancho &&
        clickY >= enemigo.y && clickY <= enemigo.y + enemigo.alto
      ) {
        mostrarInfoMicrobioFlotante(enemigo, enemigo.x, enemigo.y);
      }
    });

    // Disparo hacia el punto clickeado
    jugador.disparar(clickX, clickY);
  });
}

// ============================
// Lógica principal del juego
// ============================
function bucle() {
  if (!juegoActivo) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  jugador.actualizar();
  jugador.dibujar(ctx);

  proyectiles.forEach(p => {
    p.actualizar();
    p.dibujar(ctx);
  });

  enemigos.forEach(enemigo => {
    enemigo.actualizar();
    enemigo.dibujar(ctx);

    if (jugador.colisionaCon(enemigo)) {
      mostrarInfoMicrobio(enemigo);
    }
  });

  detectarColisiones();
  requestAnimationFrame(bucle);
}

// ============================
// Botones de control
// ============================
function configurarBotones() {
  document.getElementById('btn-iniciar').addEventListener('click', () => {
    juegoActivo = true;
    bucle();
    iniciarJuego();
  });

  document.getElementById('btn-pausar').addEventListener('click', () => {
    juegoActivo = false;
    pausarJuego();
  });

  document.getElementById('btn-continuar').addEventListener('click', () => {
    if (!juegoActivo) {
      juegoActivo = true;
      bucle();
      continuarJuego();
    }
  });

  document.getElementById('btn-generar-campo').addEventListener('click', () => {
    generarEnemigos(10, canvas.width, canvas.height);
    generarCampo();
  });
}

// ============================
// Verificación conexión backend
// ============================
function verificarConexionBackend() {
  const estadoElemento = document.getElementById('estado-conexion');

  fetch(`${BACKEND_URL}/verificar`)
    .then(res => {
      if (!res.ok) throw new Error("Error en la conexión");
      return res.json();
    })
    .then(() => {
      estadoElemento.textContent = "✅ Base de datos conectada";
      estadoElemento.style.color = "green";
      document.getElementById('btn-iniciar').disabled = false;
    })
    .catch(() => {
      estadoElemento.textContent = "❌ Error en la conexión con la base de datos";
      estadoElemento.style.color = "red";
      document.getElementById('btn-iniciar').disabled = true;
    });
}
