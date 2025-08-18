import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/auth';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '12h' });
};
