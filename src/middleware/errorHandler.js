// src/middleware/errorHandler.js
const createError = require('http-errors');

const errorHandler = (err, req, res, next) => {
  // Establecer locals, proporcionando solo el mensaje de error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Enviar la respuesta de error
  res.status(err.status || 500);
  res.json({
    error: {
      message: res.locals.message,
      status: err.status,
    }
  });
};

module.exports = errorHandler;
