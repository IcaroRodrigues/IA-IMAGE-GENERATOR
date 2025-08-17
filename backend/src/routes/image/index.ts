import { Router } from 'express';
import {
  create,
  deleteImage,
  read,
  userImageHistory,
  userLikedImages,
} from '../../controllers/imageController';

import upload from '../../middleware/upload';

const router = Router();

// Rota de criação de imagem
router.post('/image', upload.single('image'), create);

//Rota que listar as imagens
router.get('/images', read);

//Rota de listagem de imagens do usuário
router.get('/imagesByUser/:id', userImageHistory);

//Rota de listagem de imagens curtidas pelo usuário
router.get('/imagesLikedByUser/:id', userLikedImages);

//Rota de atualizar usuário
// router.patch('/user/:id', updateUser);

// Rota para deletar imagem
router.delete('/image/:id', deleteImage);

export default router;
