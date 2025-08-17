import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    if (!username) {
      return res.status(400).json({ error: 'Username é obrigatório' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Senha é obrigatório' });
    }

    const existingUser = await userRepository.findByEmail(email);
    const existingUsername = await userRepository.findByUsername(username);

    if (existingUsername) {
      return res.status(400).json({ error: 'Username já cadastrado' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const user = await userRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const readUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, username } = req.body;

    const user = await userRepository.findById(id);
    const userByEmail = await userRepository.findByEmail(email);
    const userByUsername = await userRepository.findByUsername(username);

    if (!user) {
      return res.status(404).json({ error: 'Usuário nao encontrado' });
    }

    if (userByEmail && userByEmail.id !== id) {
      return res.status(400).json({ error: 'Email ja cadastrado' });
    }

    if (userByUsername && userByUsername.id !== id) {
      return res.status(400).json({ error: 'Username ja cadastrado' });
    }

    const updatedUser = await userRepository.update(id, {
      email,
      username,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await userRepository.delete(id);

    if (deleted) {
      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }

    res.status(404).json({ error: 'Usuário nao encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
