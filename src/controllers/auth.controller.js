import { pool } from "../db/database.js";
import bcrypt from "bcrypt";
import { generarJWT, JWTforgotPassword  } from "../helpers/genJWT.js";
import { transporter } from "../config/mailer.js";

// CREAR USUARIO
export const signUp = async (req, res) => {
  try {
    let { nombre, apellido, email, rol, password } = req.body;
    console.log(req.body);
    // Convertir a minúscula
    nombre = nombre.toLowerCase();
    apellido = apellido.toLowerCase();
    email = email.toLowerCase();
    rol = rol.toLowerCase();

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

    await pool.query(
      "INSERT INTO usuarios (nombre, apellido, email, rol, password) VALUES (?,?,?,?,?)",
      [nombre, apellido, email, rol, hashedPassword]
    );

    return res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error("Error al crear usuario: ", error);
    return res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Encriptación de la password
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
    const [usuario] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (usuario.length === 0) {
      return res.status(404).json({
        message: "Correo electrónico o contraseña no son válidos",
      });
    }

    const storedPassword = usuario[0].password;
    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (passwordMatch) {
      const token = await generarJWT(usuario[0].id, usuario[0].rol, usuario[0].nombre, usuario[0].apellido, usuario[0].email);
      // Configurar la cookie con el token JWT
      res.cookie("token", token, {
        httpOnly: true, // La cookie solo es accesible a través de HTTP
        maxAge: 14400000, // Tiempo de expiración de la cookie (4 horas en milisegundos)
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

// LOGOUT
export const logOut = async (req, res) => {
  try {
    // Eliminar la cookie 'token'
    res.clearCookie('token', { path: '/', expires: new Date(0) });


    res.status(200).json({
      message: "Cierre de sesión exitoso",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Algo salió mal en el servidor",
    });
  }
};

export const changePassword = async (req, res) => {
  let currentPassword = req.body.currentPassword;
  let newPassword = req.body.newPassword;
  let userEmail = req.body.userEmail;
  
  if(!currentPassword || !newPassword || !userEmail){
    return res.status(400).json({ error: 'Se requieren la contraseña actual y la nueva contraseña' });
  }

  try {
      const [usuario] = await pool.query(
        "SELECT * FROM usuarios WHERE email = ?",[userEmail]
      )

      if (usuario.length === 0) {
        return res.status(404).json({
          message: "Correo electrónico o contraseña no son válidos",
        });
      }

      const storedPassword = usuario[0].password;
      const passwordMatch = await bcrypt.compare(currentPassword, storedPassword)

      if (passwordMatch){

        const hashedNewPassword = await hashPassword(newPassword);

        await pool.query(
          "UPDATE usuarios SET password = ? WHERE email= ?",[hashedNewPassword, userEmail]
        )
        return res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
      } else {
        return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
      }
  } catch (error) {
    return res.status(500).json({ error: 'Ha ocurrido un error al cambiar la contraseña' });
  }
};

export const forgotPassword = async (req, res) => {
  let userEmail = req.body.email;
  
  if(!userEmail){
   return res.status(400).json({ error: 'Se requiere el correo electronico' });
  }
 
  try{
    const [usuario] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",[userEmail]
    )
    
    if (usuario.length === 0) {
      return res.status(404).json({
        message: "Error de correo. Ingrese nuevamente  un correo electronico",
      });
    }
    const token = await JWTforgotPassword(usuario[0].id, usuario[0].email);
    const tokenEncoded = btoa(token);
    const verificationLink = `http://localhost:3000/ResetPassword/${tokenEncoded}`;

    //TODO SENDEMAIL
    try {
      await transporter.sendMail({
        from: 'Monitorio CITEC <mtardones99@gmail.com>', // sender address
        to: userEmail, // list of receivers
        subject: "Enlace para restablecer su contraseña de MonitoreoCITEC", // Subject line // plain text body
        html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña:</p><a href="${verificationLink}">${verificationLink}</a>`

      });
    } catch (error) {
      return res.status(400).json({ error: 'Algo salio mal' });
    }

  } catch {
    return res.status(500).json({ error: 'Ha ocurrido un inesperado' });
  }
    return res.status(200).json({ message: 'Porfavor revise su correo electronico'})
};

export const resetPassword = async(req,res) => {
  const userId = req.user.uid;
  const newPassword = req.body.newPassword;

  if(!(newPassword)){
    return res.status(400).json({ error: 'Se requiere una nueva contraseña' });
  }
  try {
    const [oldUser] = await pool.query(
      "SELECT * FROM usuarios WHERE id = ?",[userId]
    )
    if (oldUser.length === 0) {
      return res.status(404).json({
        message: "Error de resetPassword",
      });
    }
    const hashedNewPassword = await hashPassword(newPassword);
    await pool.query(
      "UPDATE usuarios SET password = ? WHERE id= ?",[hashedNewPassword, userId]
    )
    return res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    return res.status(400).json({ error: 'Algo salio mal' });
  }

};