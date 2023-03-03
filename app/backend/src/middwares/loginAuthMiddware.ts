import { Request, Response, NextFunction } from 'express';
import validateEmail from '../utils/validateEmail';

function loginAuthMiddware(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (validateEmail(email) === false) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
}

export default loginAuthMiddware;
