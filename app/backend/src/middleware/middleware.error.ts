import { Request, Response, NextFunction } from 'express';

const middlewareError = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.message);
  if (err.message.includes('&')) {
    const [message, statusCode] = err.message.split('&');
    return res.status(Number(statusCode)).json({ message });
  }
  res.status(500).json({ message: 'Internal server error' });
};

export default middlewareError;
