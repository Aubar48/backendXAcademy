// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'tu_clave_secreta';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }

    req.userId = decoded.id; // Almacenar el id del usuario en la solicitud
    next();
  });
};

module.exports = authenticate;
