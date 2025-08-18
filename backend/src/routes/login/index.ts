import { Router } from 'express';
import { login } from '../../controllers/authController';

const router = Router();

// Rota de login - retorna o token JWT do fdp
router.post('/login', login);

export default router;
