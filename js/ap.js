const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Ruta /verificar para comprobar conexión
app.get('/verificar', (req, res) => {
  const estado = mongoose.connection.readyState; // 1 = conectado

  if (estado === 1) {
    res.json({ conectado: true, mensaje: '✅ Base de datos conectada' });
  } else {
    res.status(500).json({ conectado: false, mensaje: '❌ No conectado a la base de datos' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
