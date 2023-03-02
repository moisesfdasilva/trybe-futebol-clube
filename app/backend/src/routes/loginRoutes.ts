import { Router, Request, Response } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controller/LoginController';

const matchesRoutes = Router();
const loginRouter = new LoginService();
const loginController = new LoginController(loginRouter);
matchesRoutes.post('/teams', (req: Request, res: Response) => loginController.readOne(req, res));

export default matchesRoutes;
