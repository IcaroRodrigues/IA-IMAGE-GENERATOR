import type { Request, Response } from 'express';
import { ImageRepository } from '../repositories/ImageRepository';
import { StorageService } from '../services/storageService';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();
const imageRepository = new ImageRepository();
const storageService = new StorageService();

export const read = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await imageRepository.findAll(page, limit);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imagens' });
  }
};

export const userImageHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hasUser = await userRepository.findById(id);

    if (!hasUser) {
      return res.status(404).json({ message: 'Usuário nao encontrado' });
    }

    if (!id) {
      return res.status(400).json({ message: 'Usuário precisa estar logado' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await imageRepository.findByUserId(id, page, limit);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar imagens do usuário' });
  }
};

export const userLikedImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hasUser = await userRepository.findById(id);

    if (!hasUser) {
      return res.status(404).json({ message: 'Usuário nao encontrado' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const userLikedImages = await imageRepository.findLikedByUserId(id, page, limit);

    res.json(userLikedImages);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imagens curtidas pelo usuário' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo de imagem é obrigatório' });
    }

    const { promptDetails, negativePrompt, inputResolution, seed, creatorId } = req.body;

    if (!promptDetails) {
      return res.status(400).json({ error: 'Prompt é obrigatório' });
    }

    if (!creatorId) {
      return res.status(400).json({ error: 'Creator ID é obrigatório' });
    }

    const uploadResult = await storageService.uploadImage(req.file);

    const imageData = {
      imageUrl: uploadResult.imageUrl,
      downloadUrl: uploadResult.downloadUrl,
      promptDetails,
      negativePrompt: negativePrompt || '',
      inputResolution: inputResolution || '1024x1024',
      seed: seed || generateRandomSeed(),
      creator: { id: creatorId } as any,
    };

    const savedImage = await imageRepository.create(imageData);

    res.status(201).json({
      success: true,
      image: savedImage,
      uploadDetails: {
        fileName: uploadResult.fileName,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      },
      message: 'Imagem salva com sucesso!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar imagem' });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const image = await imageRepository.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Imagem não encontrada' });
    }

    const fileName = image.imageUrl.split('/').pop();

    if (fileName) {
      await storageService.deleteImage(fileName);
    }

    const deleted = await imageRepository.deleteById(id);

    if (deleted) {
      res.json({ success: true, message: 'Imagem deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Imagem não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar imagem' });
  }
};

function generateRandomSeed(): string {
  return Math.floor(Math.random() * 999999999).toString();
}
