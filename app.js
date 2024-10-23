const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const playerRoutes = require('./src/routes/playerRoutes'); // Importar rutas de jugadores
const sequelize = require('./src/config/dabase');
const Player = require('./src/models/playerModels'); // Asegúrate de que esté correctamente escrito
const errorHandler = require('./src/middleware/errorHandler'); // Importar error handler

const app = express();

// Agregar las rutas de jugadores
app.use('/players', playerRoutes);

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON en las solicitudes
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Usar el middleware de manejo de errores
app.use(errorHandler);

// Verificar conexión a la base de datos
async function initialize() {
  try {
    await sequelize.authenticate();
    console.log('Conexión con la base de datos establecida correctamente.');

    // Sincronizar el modelo con la base de datos
    await Player.sync();
    console.log('El modelo Player está sincronizado con la tabla `players`.');

    // Aquí puedes agregar lógica adicional, como consultas a la base de datos
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

initialize();

module.exports = app;


