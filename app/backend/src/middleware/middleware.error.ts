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
    console.log('Esse é o status code', statusCode);
    return res.status(Number(statusCode)).json({ message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

export default middlewareError;
