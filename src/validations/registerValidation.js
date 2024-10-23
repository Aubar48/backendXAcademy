const { body, validationResult } = require('express-validator');

exports.validateRegister = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('El nombre de usuario debe tener al menos 3 caracteres.')
    .isAlphanumeric()
    .withMessage('El nombre de usuario debe ser alfanumérico.'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres.')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número.'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
