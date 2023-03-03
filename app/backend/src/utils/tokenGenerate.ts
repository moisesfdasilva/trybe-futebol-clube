import * as jwt from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';

require('dotenv/config');

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

function tokenGenerate(user: ILogin): string {
  const token = jwt.sign(
    { data: { userEmail: user.email } },
    secret,
    { expiresIn: '7d', algorithm: 'HS256' },
  );

  return token;
}

export default tokenGenerate;
