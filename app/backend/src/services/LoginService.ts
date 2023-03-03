import { ModelStatic } from 'sequelize';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/UserModel';
import IServiceLogin from '../interfaces/IServiceLogin';
import passHashedCompare from '../utils/passHashedCompare';

class LoginService implements IServiceLogin {
  protected model: ModelStatic<User> = User;

  async readOne(login: ILogin): Promise<User | null> {
    const findUser = await this.model.findOne({
      where: { email: login.email }
    });

    if (!findUser) { return findUser; };

    const passOk = passHashedCompare(login, findUser);
    
    return passOk;
  }
}

export default LoginService;
