interface IInputUser {
  email?: string,
  password?: string,
}

const inputUserWithoutEmailMock: IInputUser = {
  password: 'string',
}

const inputUserWithoutPassMock: IInputUser = {
  email: 'str@string.com',
}

const inputUserWithInvalidEmailMock: IInputUser = {
  email: 'str',
  password: 'string',
}

const inputUserWithInvalidPassMock: IInputUser = {
  email: 'str@string.com',
  password: '12345',
}

const inputUserNotEmailBDMock: IInputUser = {
  email: 'notemailinbd@admin.com',
  password: 'not-pass-in-bd',
}

const inputUserNotPassBDMock: IInputUser = {
  email: 'admin@admin.com',
  password: 'not-pass-in-bd',
}

const inputUserMock: IInputUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

export {
  inputUserWithoutEmailMock,
  inputUserWithoutPassMock,
  inputUserWithInvalidEmailMock,
  inputUserWithInvalidPassMock,
  inputUserNotEmailBDMock,
  inputUserNotPassBDMock,
  inputUserMock,
};
