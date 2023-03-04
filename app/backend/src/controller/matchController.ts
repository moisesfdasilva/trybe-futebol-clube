import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

class MatchesController {
  private _service: IServiceMatch;
  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    const progress = req.query.inProgress as string;
    if (progress === 'true' || progress === 'false') {
      const resultA = await this._service.readInProgress(progress);
      return res.status(200).json(resultA);
    }
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }

  async uploadInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.uploadInProgress(Number(id));
    return res.status(200).json({ message: result });
  }

  async uploadInProgressData(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const result = await this._service.uploadInProgressData({
      id: Number(id),
      homeTeamGoals: Number(homeTeamGoals),
      awayTeamGoals: Number(awayTeamGoals),
    });
    return res.status(200).json(result);
  }

  async insertMatch(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const result = await this._service.insertMatch({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    });
    return res.status(201).json(result);
  }
}

export default MatchesController;
