import express from 'express';
import mulRoutes from './routes/mul.routes.js'
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(mulRoutes);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});