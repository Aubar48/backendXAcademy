// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'tu_clave_secreta';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Log para depuración
  console.log('Encabezado de autorización:', authHeader); 

  // Verifica si el encabezado de autorización está presente y comienza con "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso no autorizado: Token no proporcionado' });
  }

  // Extrae el token del encabezado
  const token = authHeader.split(' ')[1];
  
  // Verifica el token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Manejo de errores: verifica si el token está expirado o es inválido
      const message = err.name === 'TokenExpiredError' 
        ? 'Token expirado' 
        : 'Token no válido';
      return res.status(403).json({ message });
    }

    // Almacena la información del usuario decodificada en req.user
    req.user = decoded; 
    next(); // Llama al siguiente middleware o controlador
  });
};

module.exports = authenticate;
