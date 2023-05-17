import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Middleware para verificar la autenticación del usuario
export const verificarAutenticacion = (req, res, next) => {
  // Obtener el token de la cookie o del encabezado de la solicitud
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó un token de autenticación" });
  }

  try {
    // Verificar y descodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el objeto decodificado al objeto de solicitud (req) para su posterior uso
    req.user = decoded;

    // Continuar con la siguiente función de middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token de autenticación inválido" });
  }
};
