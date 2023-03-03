import { Router, Request, Response } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controller/LoginController';
import loginAuthMiddware from '../middwares/loginAuthMiddware';
import validateJWTMiddware from '../middwares/validateJWTMiddware';

const loginRoutes = Router();
const loginRouter = new LoginService();
const loginController = new LoginController(loginRouter);
loginRoutes.post(
  '/login',
  loginAuthMiddware,
  (req: Request, res: Response) => loginController.readOne(req, res),
);
loginRoutes.get(
  '/login/role',
  validateJWTMiddware,
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default loginRoutes;
