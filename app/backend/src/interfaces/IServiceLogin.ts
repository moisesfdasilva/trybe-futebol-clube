import User from '../database/models/UserModel';
import ILogin from './ILogin';

interface IServiceLogin {
  readOne(login: ILogin): Promise<User | null>;
  getRole(login: string): Promise<User | null>;
}

export default IServiceLogin;
