import { Router } from 'express';
import { createUser } from '../../controllers/userController';

const router = Router();

// Rota de criação de usuário
router.post('/user', createUser);

//Rota de listagem de usuário
// router.get('/users', getUsers);

export default router;
