const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware: conecta o comunica una capa con la otra 
app.use(cors());
app.use(express.json());
app.use(express.static('publico'));
// Mi conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
}).catch((err) => {
  console.error('❌ Error conectando a MongoDB:', err);
});
// Respuesta
const RespuestaSchema = new mongoose.Schema({

  nombreEmpresa: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    lowercase: true
  },
  tipoServicio: {
    type: String,
    enum: ['desarrollo', 'rediseño', 'seo', 'funcionalidades'],
    required: true
  },

  objetivo: String,
  funcionalidades: String,
  tieneDiseno: String,
  referenciasDiseno: String,
  manualMarca: String,
  ayudaMediosPago: String,

  problemasTecnicos: String,
  accesosMateriales: String,

  tieneSitio: String,
  linkSitio: String,
  accesoHosting: String,

  infoProductos: String,
  linkProductos: String,
  correoVentas: String,
  mediosPago: String,
  sistemaFacturacion: String,
  infoComprador: String,
  extrasTienda: String,
  ayudaExtra: String,

  
  fecha: {
    type: Date,
    default: Date.now
  },
  // Clasificación de leads (clientes potentes)
  clasificacionLead: {
    type: String,
    enum: ['caliente', 'tibio', 'frío'],
    default: function () {
     if ((this.tipoServicio === 'desarrollo' || this.tipoServicio === 'seo') && this.tieneSitio === 'si') return 'caliente';
      else if (this.tipoServicio === 'rediseño') return 'tibio';
      else return 'frío';
    }
  }
});
const Respuesta = mongoose.model('Respuesta', RespuestaSchema);

app.post('/api/formulario', async (req, res) => {
  const { 
    nombreEmpresa, correo, tipoServicio, objetivo, funcionalidades, tieneDiseno,
    referenciasDiseno, manualMarca, ayudaMediosPago, problemasTecnicos,
    accesosMateriales, tieneSitio, linkSitio, accesoHosting, infoProductos,
    linkProductos, correoVentas, mediosPago, sistemaFacturacion, infoComprador,
    extrasTienda, ayudaExtra
  } = req.body;
  try {
    const nuevaRespuesta = new Respuesta({
      nombreEmpresa, correo, tipoServicio, objetivo, funcionalidades, tieneDiseno,
      referenciasDiseno, manualMarca, ayudaMediosPago, problemasTecnicos,
      accesosMateriales, tieneSitio, linkSitio, accesoHosting, infoProductos,
      linkProductos, correoVentas, mediosPago, sistemaFacturacion, infoComprador,
      extrasTienda, ayudaExtra
    });
    await nuevaRespuesta.save();
    res.status(201).send('✅ Respuesta guardada');
  } catch (error) {
    res.status(500).send('❌ Error al guardar respuesta');
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'publico', 'index.html'));
});
// Ruta de salud para el robotito
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
// Ruta para verificar contraseña del panel admin
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; 
  if (!ADMIN_PASSWORD) {
    return res.status(500).send('❌ Configuración incorrecta');
  }

  if (password === ADMIN_PASSWORD) {
    
    res.json({ success: true, token: 'admin_session_token_123' });
  } else {
    res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
  }
});