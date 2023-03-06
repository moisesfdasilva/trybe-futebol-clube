import { Router, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardRoutes = Router();
const leaderboardRouter = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardRouter);
leaderboardRoutes.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderboardController.getHomePerformances(req, res),
);
leaderboardRoutes.get(
  '/leaderboard/away',
  (req: Request, res: Response) => leaderboardController.getAwayPerformances(req, res),
);

export default leaderboardRoutes;
