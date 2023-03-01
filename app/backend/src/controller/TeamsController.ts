import { Router, Request, Response } from 'express';

class TeamsController {
  private _service: IServiceTeams[];
  constructor(service: IServiceTeams[]) {
    this._service = service;
  }
  async getAll(req: Request, res: Response) {
    const result = await this._service.getAll();
    return res.status(200).json(result);
  }
}