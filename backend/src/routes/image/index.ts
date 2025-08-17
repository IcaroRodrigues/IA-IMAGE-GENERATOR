import { Router } from 'express';
import { create, deleteImage, read, readByUser } from '../../controllers/imageController';
import upload from '../../middleware/upload';

const router = Router();

// Rota de criação de imagem
router.post('/image', upload.single('image'), create);

//Rota que listar as imagens
router.get('/images', read);

//Rota de listagem de imagens do usuário
router.get('/imagesByUser/:id', readByUser);

//Rota de atualizar usuário
// router.patch('/user/:id', updateUser);

// Rota para deletar imagem
router.delete('/image/:id', deleteImage);

export default router;
