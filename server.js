const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: [
    'https://formulario-contenidx.onrender.com',
    'https://admin-contenidx.onrender.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('publico'));

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
}).catch((err) => {
  console.error('❌ Error conectando a MongoDB:', err);
});

// Modelo de Respuesta
const RespuestaSchema = new mongoose.Schema({
  nombreEmpresa: { type: String, required: true },
  correo: { type: String, required: true, lowercase: true },
  tipoServicio: { type: String, enum: ['desarrollo', 'rediseño', 'seo', 'funcionalidades'], required: true },
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
  fecha: { type: Date, default: Date.now },
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

// RUTAS

// Guardar formulario
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
    console.error("❌ Error al guardar:", error);
    res.status(500).send('❌ Error al guardar respuesta');
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'publico', 'index.html'));
});

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// Ruta de login para panel admin
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

// Ruta para obtener leads 
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Respuesta.find({});
    res.json(leads);
  } catch (error) {
    console.error("❌ Error al obtener leads:", error);
    res.status(500).send('Error obteniendo leads');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});