import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

class MatchesController {
  private _service: IServiceMatch;
  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    return res.status(200).json(result);
  }
}

export default MatchesController;
