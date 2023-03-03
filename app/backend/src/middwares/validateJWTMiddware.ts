import { Request, Response, NextFunction } from 'express';
import tokenDecode from '../utils/tokenDecode';

function validateJWTMiddware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decode = tokenDecode(token);
    req.body.userEmail = decode;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default validateJWTMiddware;
