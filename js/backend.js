// backend.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Modelos
const Microbio = require('./models/Microbio');
const Medicamento = require('./models/Medicamento');
const Prueba = require('./models/Prueba');

const app = express();
const port = process.env.PORT || 3000;

// 🛡️ Seguridad CORS
// Render necesita que pongas el dominio de tu frontend en producción.
// Mientras desarrollas, agrega también localhost y 127.0.0.1
const corsOptions = {
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://tu-frontend-en-la-nube.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// 🧠 Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });

// 🧪 Verificación de conexión
app.get('/verificar', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({
      servidor: 'activo',
      conexionMongo: mongoose.connection.readyState === 1 ? 'conectado' : 'no conectado',
      estadoCodigo: mongoose.connection.readyState
    });
  } catch (error) {
    res.status(500).json({
      servidor: 'activo',
      conexionMongo: 'no conectado',
      estadoCodigo: mongoose.connection.readyState
    });
  }
});

// ==========================
// 📦 ENDPOINTS API REST
// ==========================

// ---- MICROBIOS ----
app.get('/microbios', async (req, res) => {
  try {
    const data = await Microbio.find();
    res.json(data);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudieron obtener los microbios' });
  }
});

app.post('/microbios', async (req, res) => {
  try {
    const nuevo = new Microbio(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo crear el microbio' });
  }
});

app.put('/microbios/:id', async (req, res) => {
  try {
    const actualizado = await Microbio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo actualizar el microbio' });
  }
});

app.delete('/microbios/:id', async (req, res) => {
  try {
    await Microbio.findByIdAndDelete(req.params.id);
    res.json({ status: 'OK', message: 'Microbio eliminado' });
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo eliminar el microbio' });
  }
});

// ---- MEDICAMENTOS ----
app.get('/medicamentos', async (req, res) => {
  try {
    const data = await Medicamento.find();
    res.json(data);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudieron obtener los medicamentos' });
  }
});



app.post('/medicamentos', async (req, res) => {
  try {
    const nuevo = new Medicamento(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo crear el medicamento' });
  }
});

app.put('/medicamentos/:id', async (req, res) => {
  try {
    const actualizado = await Medicamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo actualizar el medicamento' });
  }
});

app.delete('/medicamentos/:id', async (req, res) => {
  try {
    await Medicamento.findByIdAndDelete(req.params.id);
    res.json({ status: 'OK', message: 'Medicamento eliminado' });
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo eliminar el medicamento' });
  }
});

// ---- PRUEBAS ----
app.get('/pruebas', async (req, res) => {
  try {
    const data = await Prueba.find();
    res.json(data);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudieron obtener las pruebas' });
  }
});

app.post('/pruebas', async (req, res) => {
  try {
    const nueva = new Prueba(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo crear la prueba' });
  }
});

app.put('/pruebas/:id', async (req, res) => {
  try {
    const actualizada = await Prueba.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo actualizar la prueba' });
  }
});

app.delete('/pruebas/:id', async (req, res) => {
  try {
    await Prueba.findByIdAndDelete(req.params.id);
    res.json({ status: 'OK', message: 'Prueba eliminada' });
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'No se pudo eliminar la prueba' });
  }
});

// 🧯 Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'ERROR', message: 'Error interno del servidor' });
});

// 🚀 Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});
