import express from 'express';
import pool from './database/db';
import  productsRouter  from './routes/products.routes';

const PORT: number = 8000;

const app = express();

// Body Parser
app.use(express.json());

app.use('/api/v1', productsRouter);

pool.connect((err, client, release) => {
  if (err)  return console.error('Error acquiring client ${err.stack}');
  
  console.log('Connected to the database');

  release();
});

app.listen(PORT, () => {
  console.log(`application is running on port ${PORT}`);
});
