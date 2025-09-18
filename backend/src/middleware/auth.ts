import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config/auth';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { rmSync } from 'fs';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '12h' });
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const userRepository = AppDataSource.getRepository(User);
      const currentUser = await userRepository.findOneBy({ id: decoded.id });

      if (!currentUser) {
        return res.status(401).json({ message: 'User not found, authorization denied' });
      }

      req.user = currentUser;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
