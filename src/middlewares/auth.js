import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Middleware para verificar la autenticación del usuario
export const verificarAutenticacion = (req, res, next) => {
  // Obtener el token de la cookie o del encabezado de la solicitud
  const token = req.headers["x-crdtl"] || req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó un token de autenticación" });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el objeto decodificado al objeto de solicitud (req) para su posterior uso
    req.user = decoded;

    // Continuar con la siguiente función de middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const verificarTokenPass = (req, res, next) => {
  const token = req.headers['x-crdtl'];
  const decodedToken = atob(token);
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó ningún token.' });
  }
  try {
    // Verifica el token
    const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET);
    // Almacena el valor decodificado en req.user para su uso posterior en otras rutas.
    req.user = decoded;
    // Llama a next() para pasar al siguiente middleware o ruta
    next();
  } catch (error) {
    // Si algo va mal, por ejemplo, si el token no es válido o ha expirado, jwt.verify() lanzará un error.
    return res.status(400).json({ error: 'Ocurrió un error al verificar el token.' });
  }
}

export const verificarExpiracion = (req, res, next) => {
  const token = req.headers["x-crdtl"] || req.cookies.token;

  if (!token) {
    return res.status(403).json({ auth: false, message: 'No se ha provisto un token.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({ auth: false, message: 'Token expirado.' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ auth: false, message: 'Token inválido.' });
  }
}
