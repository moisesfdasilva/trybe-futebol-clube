import { Request, Response } from 'express';
import IServiceLogin from '../interfaces/IServiceLogin';

class LoginController {
  private _service: IServiceLogin;
  constructor(service: IServiceLogin) {
    this._service = service;
  }

  async readOne(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._service.readOne({ email, password });
    return res.status(200).json(result);
  }
}

export default LoginController;
