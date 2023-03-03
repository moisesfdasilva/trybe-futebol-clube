interface UserData {
  userEmail: string,
}

interface TokenDecode {
  data: UserData,
  iat: number,
  exp: number,
}

export default TokenDecode;
