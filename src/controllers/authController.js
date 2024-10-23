// src/controllers/authController.js
const authService = require('../services/auth.services');
const { validateRegister } = require('../validations/registerValidation');
const { validateLogin } = require('../validations/loginValidation');

// Registro de usuario
exports.register = [validateRegister, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.register(username, password);
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
}];

// Login de usuario
exports.login = [validateLogin, async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}];
