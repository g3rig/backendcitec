import { pool } from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// CREAR USUARIO
export const signUp = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    if (!nombre || !apellido || !email || !password || !rol) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const checkUser = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (checkUser[0].length > 0) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, email, password, rol) VALUES (?,?,?,?,?)",
      [nombre, apellido, email, hashedPassword, rol]
    );

    return res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error("Error al crear usuario: ", error);
    return res.status(500).json({ error: "Error al crear usuario" });
  }
};

const hashPassword = async (password) => {
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// LOGIN
export const signIn = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({
      message: "Faltan parámetros de correo electrónico o contraseña",
    });
  }
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Correo electrónico o contraseña no son válidos",
      });
    }

    const storedPassword = result[0].password;
    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (passwordMatch) {
      const token = generateToken(result[0].id, result[0].rol);
      // Configurar la cookie con el token JWT
      res.cookie("token", token, {
        httpOnly: true, // La cookie solo es accesible a través de HTTP
        maxAge: 3600000, // Tiempo de expiración de la cookie (1 hora en milisegundos)
      });

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        success: true,
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Correo electrónico o contraseña no son válidos",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Algo salió mal en el servidor",
    });
  }
};

// Generar token JWT
const generateToken = (userId, userRole) => {
  const payload = {
    userId: userId,
    role: userRole,
  };

  const options = {
    expiresIn: 3600, // Tiempo de expiración del token (1 hora en este caso)
  };

  // Generar token utilizando la clave secreta
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  console.log("Token: ", token);

  return token;
};
