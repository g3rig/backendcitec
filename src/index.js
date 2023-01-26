import express from 'express';
import mul1Routes from './routes/mul_1.routes.js'

const app = express();

app.use(express.json());

app.use(mul1Routes)

app.listen(4000, () => {
  console.log('Server running on port 4000');
});