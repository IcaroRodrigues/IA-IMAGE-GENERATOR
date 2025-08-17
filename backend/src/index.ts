import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './data-source';
import user from './routes/user';
import login from './routes/authenticate';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', user);
app.use('/login', login);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
