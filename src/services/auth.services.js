// src/services/authService.js
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'tu_clave_secreta';

// Registro de usuario
exports.register = async (username, password) => {
  try {
    // Verifica que el nombre de usuario y la contraseña sean válidos
    if (!username || !password) {
      throw new Error('Nombre de usuario y contraseña son obligatorios.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    return user;
  } catch (error) {
    throw new Error('Error al registrar el usuario: ' + error.message);
  }
};

// Login de usuario
exports.login = async (username, password) => {
  try {
    // Verificar que se proporcionen tanto el nombre de usuario como la contraseña
    if (!username || !password) {
      throw new Error('Nombre de usuario y contraseña son obligatorios.');
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    // Genera el token con una expiración de 1 hora
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    // Retorna el token junto con la información del usuario
    return { token, user: { id: user.id, username: user.username } };
  } catch (error) {
    throw new Error('Error en el inicio de sesión: ' + error.message);
  }
};
