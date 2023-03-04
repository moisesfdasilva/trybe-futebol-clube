import { Router, Request, Response } from 'express';
import MatchService from '../services/matchService';
import MatchesController from '../controller/matchController';
import validateJWTMiddware from '../middwares/validateJWTMiddware';

const matchRoutes = Router();
const matchRouter = new MatchService();
const matchController = new MatchesController(matchRouter);
matchRoutes.get('/matches', (req: Request, res: Response) => matchController.readAll(req, res));
matchRoutes.patch(
  '/matches/:id/finish',
  validateJWTMiddware,
  (req: Request, res: Response) => matchController.uploadInProgress(req, res),
);
matchRoutes.patch(
  '/matches/:id',
  validateJWTMiddware,
  (req: Request, res: Response) => matchController.uploadInProgressData(req, res),
);

export default matchRoutes;
