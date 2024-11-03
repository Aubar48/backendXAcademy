const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const playerRoutes = require('./src/routes/player.routes'); // Importar rutas de jugadores
const femaleRoutes = require('./src/routes/playerFemale.routes'); // Importar rutas de jugadores
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./src/config/dabase');
const Player = require('./src/models/playerModels'); // Asegúrate de que esté correctamente escrito
const PlayerFemale = require('./src/models/playerFemaleModels'); // Asegúrate de que esté correctamente escrito
const User = require('./src/models/userModels'); // Asegúrate de que esté correctamente escrito
const errorHandler = require('./src/middleware/errorHandler'); // Importar error handler
const authRoutes = require('./src/routes/auth.routes');
const app = express();

// Middleware

app.use(cors());

app.use(express.json()); // Para parsear JSON en las solicitudes
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Api de jugadoras/es de fifa',
      version: '1.0.0',
      description: 'API for managing players and female players',
    },
    servers: [
      {
        url: `http://localhost:3000`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Puedes cambiarlo si usas otro tipo de token
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Aquí se aplica el esquema de seguridad a todas las rutas
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de autenticación
app.use('/auth', authRoutes);
// Agregar de player
app.use('/players', playerRoutes);

// Agregar de female
app.use('/female', femaleRoutes);
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
    // Sincronizar el modelo con la base de datos
    await Player.sync();
    // Sincronizar el modelo con la base de datos
    await PlayerFemale.sync();
    await User.sync();
    // Aquí puedes agregar lógica adicional, como consultas a la base de datos
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

initialize();

module.exports = app;


