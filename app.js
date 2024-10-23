let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let sequelize = require('./config/database');
let indexRouter = require('./routes/player');
let usersRouter = require('./routes/users');

const sequelize = require('./src/config/dabase');
const Player = require('./src/./models/player');
var app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON en las solicitudes


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

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
    } finally {
      await sequelize.close();
    }
  }
  
  initialize();

module.exports = app;
