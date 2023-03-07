import tokenGenerate from '../../utils/tokenGenerate';

interface IToken {
  Authorization: string,
}
  
const invalidToken: IToken = {
  Authorization: 'invalid-token',
}

const validToken: IToken = {
  Authorization: tokenGenerate({
    email: 'admin@admin.com',
    password: 'secret_admin',
  }),
}

export {
  invalidToken,
  validToken,
};