import { Router } from 'express';
import { createUser } from '../../controllers/userController.ts';

const router = Router();

// Rota de criação de usuário
router.post('/user', createUser);

//Rota de listagem de usuário

export default router;
