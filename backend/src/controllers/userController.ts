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

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};
