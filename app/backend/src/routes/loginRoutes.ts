import { Router, Request, Response } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controller/LoginController';
import loginAuthMiddware from '../middwares/loginAuthMiddware';

const matchesRoutes = Router();
const loginRouter = new LoginService();
const loginController = new LoginController(loginRouter);
matchesRoutes.post(
  '/login',
  loginAuthMiddware,
  (req: Request, res: Response) => loginController.readOne(req, res),
);

export default matchesRoutes;
