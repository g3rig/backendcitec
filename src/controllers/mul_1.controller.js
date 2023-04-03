import { pool } from "../db/conn.js";
import { format, parse } from "date-fns";

export const getLastDataM1 = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM mul_1 ORDER BY id_reg_mul1 DESC limit 1"
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getBetweenDateM1 = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;
  let sensor = req.query.sensor

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const [result] = await pool.query(
      `SELECT ${sensor}, fecha_m1, hora_m1 FROM mul_1 WHERE fecha_m1 BETWEEN ? AND ? ORDER BY fecha_m1 ASC, hora_m1 ASC`,
      [fecha_inicio, fecha_fin]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron datos para las fechas especificadas" });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getMaxBetweenDateM1 = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;
  let sensor = req.query.sensor;

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const result = await pool.query(
      `SELECT MAX(${sensor}) AS max_value , fecha_m1, hora_m1 FROM mul_1 WHERE fecha_m1 BETWEEN ? AND ? GROUP BY fecha_m1`,
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

export const getMinBetweenDateM1 = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;
  let sensor = req.query.sensor;

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const result = await pool.query(
      `SELECT MIN(${sensor}) AS min_value , fecha_m1, hora_m1 FROM mul_1 WHERE fecha_m1 BETWEEN ? AND ? GROUP BY fecha_m1`,
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

export const getAvgBetweenDateM1 = async (req, res) => {
  let fecha_inicio = req.query.fecha_inicio;
  let fecha_fin = req.query.fecha_fin;
  let sensor = req.query.sensor;

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ message: "Faltan parámetros de fecha" });
  }

  if (!isValidDate(fecha_inicio) || !isValidDate(fecha_fin)) {
    return res.status(400).json({ message: "Fechas no válidas" });
  }

  try {
    const [result] = await pool.query(
      `SELECT AVG(${sensor}) AS avg_value , fecha_m1 FROM mul_1 WHERE fecha_m1 BETWEEN ? AND ? GROUP BY fecha_m1`,
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