import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config/auth';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '12h' });
};

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Missing Authorization header or malformed token' });
    }

    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
