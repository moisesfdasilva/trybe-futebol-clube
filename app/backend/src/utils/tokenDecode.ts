import * as jwt from 'jsonwebtoken';
import ITokenDecode from '../interfaces/ITokenDecode';

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'jwt_secret';

function tokenDecode(token: string): string {
  const decoded = jwt.verify(token, secret) as ITokenDecode;
  const user = decoded.data.userEmail;
  return user;
}

export default tokenDecode;
