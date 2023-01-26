import { pool } from '../db/conn.js';

export const getLastDataM1 = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM mul_1 ORDER BY id_reg_mul1 DESC limit 1');
  res.send(result[0]);
}