import { Request, Response, NextFunction } from 'express';
import validateEmail from '../utils/validateEmail';

function loginAuthMiddware(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  if (!body.email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!body.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (validateEmail(body.email) === false) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (body.password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
}

export default loginAuthMiddware;
