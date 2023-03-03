interface IUserEmail {
  userEmail: string,
}

interface ITokenDecode {
  data: IUserEmail,
}

export default ITokenDecode;
