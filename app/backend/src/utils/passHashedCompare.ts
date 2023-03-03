import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import ILogin from '../interfaces/ILogin';

async function passHashedCompare(login: ILogin, user: User): Promise<User | null> {
  const pass = login.password;
  const passHashedDB = user.password;

  const match = await bcrypt.compare(pass, passHashedDB);

  if(match) {
    return user;
  } else {
    return null;
  }
}

export default passHashedCompare;
