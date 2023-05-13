import { pool } from "../db/conn.js";

export const postLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan parámetros de correo electrónico o contraseña" });
  };
  try{
    const [result] = await pool.query(
      'SELECT * FROM `credenciales` WHERE email = ? AND password = ? ',[email , password]
    );
    if (result.length === 0){
      return res.status(404).json({
        message: "Correo electronico o contraseña no son validos"
      });
    } else {
        res.status(200).json({
        message: "Inicio de sesión exitoso",
        success: true
       });
    }
  }catch(error){
    console.error(error);
    console.log("soy un mesanje de error");
    return res.status(500).json({
      message : "Algo salio mal en el servidor",
    });
  }
};