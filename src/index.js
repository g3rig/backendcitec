import express from 'express';
import mul1Routes from './routes/mul_1.routes.js'
import mul2Routes from './routes/mul_2.routes.js'

const app = express();

app.use(express.json());

app.use(mul1Routes);
app.use(mul2Routes);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});