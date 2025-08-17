import express from 'express';

import user from './routes/user/index.ts';
import login from './routes/authenticate/index.ts';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', user);
app.use('/login', login);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
