import { pool } from '../db/conn.js';

export const getLastDataM2 = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM mul_2 ORDER BY id_reg_mul2 DESC limit 1');
  res.send(result[0]);
}