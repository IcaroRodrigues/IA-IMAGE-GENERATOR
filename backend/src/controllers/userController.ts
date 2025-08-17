import type { Request, Response } from 'express'; // apenas tipos

import bcrypt from 'bcrypt';
import { User } from '../@types/user';

const users: User[] = [];

export const createUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }

  if (!username) {
    return res.status(400).json({ error: 'Username é obrigatório' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password é obrigatório' });
  }

  const hashedPassword = await bcrypt.hash(String(password), 10);
  const user = { id: users.length + 1, email, password: hashedPassword, username };

  users.push(user);

  res.status(201).json(user);
};

export const listUsers = (req: Request, res: Response) => {
  res.json(users);
};
