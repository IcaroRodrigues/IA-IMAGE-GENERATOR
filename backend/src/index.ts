import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import path from 'path';
import { AppDataSource } from './data-source';
import user from './routes/user';
import image from './routes/image';
import login from './routes/authenticate';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/', user);
app.use('/', image);
app.use('/login', login);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
