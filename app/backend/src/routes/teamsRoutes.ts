import { Router, Request, Response } from 'express';
import TeamService from '../services/TeamService';
import TeamsController from '../controller/TeamsController';

const teamsRoutes = Router();
const teamsRouter = new TeamService();
const teamsController = new TeamsController(teamsRouter);
teamsRoutes.get('/teams', (req: Request, res: Response) => teamsController.readAll(req, res));
teamsRoutes.get('/teams/:id', (req: Request, res: Response) => teamsController.readById(req, res));

export default teamsRoutes;
