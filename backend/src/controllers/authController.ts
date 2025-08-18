import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/UserRepository';
import { generateToken } from '../middleware/auth';

const userRepository = new UserRepository();

export const login = async (req: Request, res: Response) => {
  try {
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Both email and password are required!' });
    }

    const user = await userRepository.findByEmail(email);

    if(!user) {
      return res.status(400).json({ message: `Email ${email} not registered` });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if(!passwordValid) {
      return res.status(400).json({ message: `Email or password invalid!` });
    }

    const token = generateToken(user.id)

    res.status(200).json({ email, token });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }

};