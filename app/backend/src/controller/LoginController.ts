import { Request, Response } from 'express';
import IServiceLogin from '../interfaces/IServiceLogin';
import tokenGenerate from '../utils/tokenGenerate';
// import tokenDecode from '../utils/tokenDecode';

class LoginController {
  private _service: IServiceLogin;
  constructor(service: IServiceLogin) {
    this._service = service;
  }

  async readOne(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._service.readOne({ email, password });
    if (!result) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = tokenGenerate({ email, password });
    return res.status(200).json({ token });
  }

  async readRole(req: Request, res: Response) {
    // const token = req.header('Authorization');
    // const userId = tokenDecode(token);
    // const result = await this._service.readOne({ email, password });
    // if (result.message) {
    //   return res.status(400).json({ message: category.message });
    // }
    return res.status(200).json('result');
  }
  // 200 { role: 'admin' }
}

export default LoginController;
