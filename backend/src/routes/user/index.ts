import { Router } from 'express';
import { createUser, deleteUser, readUsers, updateUser } from '../../controllers/userController';
import { authMiddleware } from '../../middleware/auth';

const router = Router();

// Rota de criação de usuário
router.post('/user', createUser);

//Rota que listar os usuários
router.get('/users', authMiddleware, readUsers);

//Rota de atualizar usuário
router.patch('/user/:id', updateUser);

// Rota para deletar usuário
router.delete('/user/:id', deleteUser);

export default router;
