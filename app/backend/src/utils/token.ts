import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'secret';
const JWT_OPTIONS: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1 days' };

const createToken = (payload: jwt.JwtPayload) => {
  const token = jwt
    .sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const result = jwt.verify(authorization, JWT_SECRET);
    console.log('Resultado do token:', result);
    req.body.JwtPayload = result;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

export { createToken, validateToken };
