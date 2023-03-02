import { ModelStatic } from 'sequelize';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/UserModel';
import IServiceLogin from '../interfaces/IServiceLogin';

class LoginService implements IServiceLogin {
  protected model: ModelStatic<User> = User;

  async readOne(login: ILogin): Promise<User | null> {
    const findUser = this.model.findOne({
      where: {
        email: login.email,
        password: login.password,
      }
    });
    return findUser;
  }
}

export default LoginService;
