//require('dotenv').config();
const mongoose = require('mongoose');

const { DB_USER, DB_PASS } = process.env;
const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@microbioscluster.jokw3jt.mongodb.net/microorganismosDB?retryWrites=true&w=majority&appName=microbiosCluster`;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));


  