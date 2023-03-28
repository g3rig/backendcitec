import { pool } from '../db/conn.js';

export const getLastDataM2 = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM mul_2 ORDER BY id_reg_mul2 DESC limit 1');
  res.send(result[0]);
}

//Temperatura Biblioteca piso 2
export const getBetweenDateM2 = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const [result] = await pool.query(
      "SELECT p2tmt1, fecha_m2, hora_m2 FROM mul_2 WHERE fecha_m2 BETWEEN ? AND ?",
      [fecha_inicio, fecha_fin]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//Temperatura Máxima Biblioteca piso 2
export const getMaxBetweenDateM2 = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const [result] = await pool.query(
      "SELECT MAX(p2tmt1) AS max_value , fecha_m2, hora_m2 FROM mul_2 WHERE fecha_m2 BETWEEN ? AND ? GROUP BY fecha_m2",
      [fecha_inicio, fecha_fin]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//Temperatura Mínima Biblioteca piso 2
export const getMinBetweenDateM2 = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const [result] = await pool.query(
      "SELECT MIN(p2tmt1) AS min_value , fecha_m2, hora_m2 FROM mul_2 WHERE fecha_m2 BETWEEN ? AND ? GROUP BY fecha_m2",
      [fecha_inicio, fecha_fin]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//Temperatura Promedio Biblioteca piso 2
export const getAvgBetweenDateM2 = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const [result] = await pool.query(
      "SELECT AVG(p2tmt1) AS avg_value , fecha_m2 FROM mul_2 WHERE fecha_m2 BETWEEN ? AND ? GROUP BY fecha_m2",
      [fecha_inicio, fecha_fin]
    );
    res.send(result);
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