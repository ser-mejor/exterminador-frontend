import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;

// URI de conexión (usa variables de entorno en producción)
const uri = 'mongodb+srv://martinezsergirubi:<db_password>@microbioscluster.jokw3jt.mongodb.net/?retryWrites=true&w=majority&appName=microbiosCluster';
const client = new MongoClient(uri);

app.get('/verificar', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('microbiosDB');
    const coleccion = db.collection('microbios');
    const documentos = await coleccion.find().toArray();
    res.json(documentos);
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error);
    res.status(500).json({ error: 'Error al conectar con MongoDB Atlas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
