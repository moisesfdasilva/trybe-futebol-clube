import { Request, Response, NextFunction } from 'express';
import tokenDecode from '../utils/tokenDecode';

function validateJWTMiddware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    tokenDecode(token);
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
}

export default validateJWTMiddware;
