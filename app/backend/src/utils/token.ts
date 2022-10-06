import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'secret';
const JWT_OPTIONS: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };
class Token {
  constructor(private needTokenContent: boolean = false) {
    this.needTokenContent = needTokenContent;
  }

  public createToken = (payload: jwt.JwtPayload) => {
    const token = jwt
      .sign(payload, JWT_SECRET, JWT_OPTIONS);
    return token;
  };

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const result = jwt.verify(authorization, JWT_SECRET);
      if (this.needTokenContent === true) {
        req.body.JwtPayload = result;
      }
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  };
}

export default Token;
