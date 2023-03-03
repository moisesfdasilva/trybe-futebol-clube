import { Request, Response } from 'express';
import IServiceLogin from '../interfaces/IServiceLogin';
import tokenGenerate from '../utils/tokenGenerate';

class LoginController {
  private _service: IServiceLogin;
  constructor(service: IServiceLogin) {
    this._service = service;
  }

  async readOne(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._service.readOne({ email, password });
    if (!result) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const token = tokenGenerate({ email, password });
    return res.status(200).json({ token });
  }
}

export default LoginController;
