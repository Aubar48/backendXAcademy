// src/controllers/authController.js
const authService = require('../services/auth.services');

// Registro de usuario
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.register(username, password);
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
}

  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
