// importador.js
const mongoose = require('mongoose');
const fs = require('fs');

// Conectar a la base MongoDB local
mongoose.connect('mongodb://localhost/microbiosDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir el esquema de microbio
const Microbio = mongoose.model('Microbio', new mongoose.Schema({
  nombre: String,
  tipo: String,
  caracteristicas: [String],
  tratamiento: [String]
}));

// Leer datos desde el archivo JSON
const datos = JSON.parse(fs.readFileSync('datos.json', 'utf-8'));

// Insertar cada microbio en la base
async function importarDatos() {
  try {
    await Microbio.deleteMany(); // Limpiar datos anteriores (opcional)
    await Microbio.insertMany(datos);
    console.log('✅ Microorganismos importados correctamente.');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error al importar:', err);
  }
}

importarDatos();
