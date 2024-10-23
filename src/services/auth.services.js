// src/services/authService.js
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'tu_clave_secreta';

// Registro de usuario
exports.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  return user;
};

// Login de usuario
exports.login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
  return token;
};
