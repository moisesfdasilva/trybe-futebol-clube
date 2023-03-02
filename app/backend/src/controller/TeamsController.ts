import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamsController {
  private _service: IServiceTeam;
  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }
}

export default TeamsController;