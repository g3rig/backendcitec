import { pool } from "../db/database.js";

export const getLastData = async (req, res) => {
  let mul = req.query.mul;
  let order = mul == "mul_1" ? "id_reg_mul1" : "id_reg_mul2";
  try {
    const [result] = await pool.query(
      `SELECT * FROM ${mul} ORDER BY ${order} DESC limit 1`
    );
    res.send(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

export const getLastDataSensor = async (req, res) => {
  let sensor = req.query.sensor;
  let mul = req.query.mul;
  let fecha = req.query.fecha;
  let hora = req.query.hora;

  try {
    const [result] = await pool.query(
      `SELECT ${sensor}, ${fecha}, ${hora} FROM ${mul} ORDER BY ${hora} DESC limit 10`
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "No se encontraron datos para las fechas especificadas",
      });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getBetweenDate = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;
  let sensor = req.query.sensor;
  let mul = req.query.mul;
  let fecha = mul == "mul_1" ? "fecha_m1" : "fecha_m2";
  let hora = mul == "mul_1" ? "hora_m1" : "hora_m2";

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const [result] = await pool.query(
      `SELECT ${sensor}, ${fecha}, ${hora} FROM ${mul} WHERE ${fecha} BETWEEN ? AND ? ORDER BY ${fecha} ASC, ${hora} ASC`,
      [fecha_inicio, fecha_fin]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "No se encontraron datos para las fechas especificadas",
      });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

function isValidDate(dateString) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}
