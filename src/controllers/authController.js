// src/controllers/authController.js
const bcrypt = require('bcryptjs'); // Asegúrate de usar la misma versión de bcrypt
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para generar el token
const authService = require('../services/auth.services'); // Asegúrate de que el nombre sea correcto
const { validateRegister } = require('../validations/registerValidation');
const { validateLogin } = require('../validations/loginValidation');
const User = require('../models/userModels'); // Importa tu modelo de usuario

// Registro de usuario
exports.register = [validateRegister, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.register(username, password);
    return res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    console.error('Error al registrar el usuario:', error); // Log para depuración
    return res.status(500).json({ message: 'Error al registrar el usuario' }); // Mensaje genérico para evitar detalles
  }
}];

// Login de usuario
exports.login = [validateLogin, async (req, res) => {
  const { username, password } = req.body; // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud

  try {
    // Encuentra al usuario por nombre de usuario
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // Cambia a un status 404
    }

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' }); // Cambia a un status 401
    }

    // Genera un token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'tu_clave_secreta',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token, user }); // Devuelve el token y los datos del usuario
  } catch (error) {
    console.error('Error en el inicio de sesión:', error); // Log para depuración
    return res.status(500).json({ message: 'Error en el inicio de sesión' }); // Mensaje genérico para evitar detalles
  }
}];

// Logout de usuario
exports.logout = (req, res) => {
  // Aquí puedes eliminar el token del lado del cliente, pero en el servidor no hacemos nada específico.
  // Si decides implementar la invalidación del token, aquí es donde puedes hacerlo.
  
  return res.status(200).json({ message: 'Sesión cerrada correctamente' });
};
