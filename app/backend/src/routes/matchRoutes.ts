import { Router, Request, Response } from 'express';
import MatchService from '../services/matchService';
import MatchesController from '../controller/matchController';

const matchRoutes = Router();
const matchRouter = new MatchService();
const matchController = new MatchesController(matchRouter);
matchRoutes.get('/matches', (req: Request, res: Response) => matchController.readAll(req, res));

export default matchRoutes;
