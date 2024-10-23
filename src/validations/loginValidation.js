const { body, validationResult } = require('express-validator');

exports.validateLogin = [
  body('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
  body('password').notEmpty().withMessage('La contraseña es requerida.'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
