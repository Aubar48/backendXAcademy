// src/middleware/errorHandler.js
const createError = require('http-errors');

const errorHandler = (err, req, res, next) => {
  try {
    // Establecer locals, proporcionando solo el mensaje de error en desarrollo
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Enviar la respuesta de error
    res.status(err.status || 500);
    res.json({
      error: {
        message: res.locals.message,
        status: err.status || 500, // Asegúrate de que el estado sea 500 si no se proporciona
      }
    });
  } catch (error) {
    // Manejar cualquier error que ocurra al procesar la respuesta
    res.status(500).json({
      error: {
        message: 'Error al manejar el error: ' + error.message,
      }
    });
  }
};

module.exports = errorHandler;
