import { pool } from "../db/database.js";

// OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(500).json({
      message: "Algo salió mal",
    });
  }
};

// OBTENER USUARIO POR ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT nombre, apellido, email, rol FROM usuarios WHERE id = ?",
      [id]
    );

    if (result[0].length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result[0];

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario: ", error);
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, rol, status } = req.body;

  try {
    // Verificar si el usuario existe antes de actualizarlo
    const checkUser = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);

    if (checkUser[0].length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si existe otro usuario con el mismo correo electrónico
    const checkEmail = await pool.query("SELECT * FROM usuarios WHERE email = ? AND id != ?", [
      email, id
    ]);

    if (checkEmail[0].length > 0) {
      return res.status(404).json({ error: "El email ya está registrado en otro usuario" });
    }

    // Actualizar los campos del usuario en la base de datos
    await pool.query(
      "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, rol = ?, status = ? WHERE id = ?",
      [nombre, apellido, email, rol, status, id]
    );

    return res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el usuario: ", error);
    return res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};


// BORAR USUARIO POR ID
export const deleteUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const checkUser = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);
    if (checkUser[0].length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return res.status(204).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el usuario: ", error);
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
