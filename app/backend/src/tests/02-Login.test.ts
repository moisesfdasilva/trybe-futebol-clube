import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';

import {
  inputUserWithoutEmailMock,
  inputUserWithoutPassMock,
  inputUserWithInvalidEmailMock,
  inputUserWithInvalidPassMock,
  inputUserNotEmailBDMock,
  inputUserNotPassBDMock,
  inputUserMock,
} from './mocks/loginMock';

import { userMock } from './mocks/userMock';
import { invalidToken, validToken } from './mocks/tokenMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('2. Teste da rota /login:', () => {
  afterEach(() => {
    sinon.restore();
  });

  it(`2.1. Sem o email informado deve retornar status 400 e a mensagem "All fields must be
  filled".`, async function () {
    const response = await chai.request(app).post('/login').send(inputUserWithoutEmailMock);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it(`2.2. Sem o password informado deve retornar status 400 e a mensagem "All fields must
  be filled".`, async function () {
    const response = await chai.request(app).post('/login').send(inputUserWithoutPassMock);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it(`2.3. Com um email inválido deve retornar status 400 e a mensagem "All fields must
  be filled".`, async function () {
    const response = await chai.request(app).post('/login').send(inputUserWithInvalidEmailMock);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it(`2.4. Com uma senha de menos de seis digitos deve retornar status 400 e a mensagem 
  "All fields must be filled".`, async function () {
    const response = await chai.request(app).post('/login').send(inputUserWithInvalidPassMock);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it(`2.5. Com um email que não consta no banco de dados deve retornar status 400 e a mensagem 
  "All fields must be filled".`, async function () {
    sinon.stub(Model, 'findOne').resolves(null);
    const response = await chai.request(app).post('/login').send(inputUserNotEmailBDMock);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it(`2.6. Com um email que consta no banco de dados e a senha não deve retornar status 400 e a 
  mensagem "All fields must be filled".`, async function () {
    sinon.stub(Model, 'findOne').resolves(userMock);
    const response = await chai.request(app).post('/login').send(inputUserNotPassBDMock);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('2.7. Com email e senha que constam no banco de dados deve retornar status 200 e o token".',
  async function () {
    sinon.stub(Model, 'findOne').resolves(userMock);
    const response = await chai.request(app).post('/login').send(inputUserMock);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('2.8. Sem o token deve retornar status 401 e a mensagem "Token not found".' ,
  async function () {
    const response = await chai.request(app).get('/login/role');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it(`2.9. Com um token inválido deve retornar status 401 e a mensagem "Token must be a 
  valid token".` , async function () {
    const response = await chai.request(app).get('/login/role').set(invalidToken);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });

  it(`2.10. Com um token válido, e email e senha cadastrados no banco de dados deve retornar
  status 200 e os dados do usuário.` , async function () {
    sinon.stub(Model, 'findOne').resolves(userMock);

    const response = await chai.request(app).get('/login/role')
      .set(validToken)
      .send(inputUserMock);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(userMock);
  });

  it(`2.11. Com um token válido, e email ou senha não cadastrados no banco de dados deve retornar
  status 401 e mensagem "Invalid email or password".` , async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const response = await chai.request(app).get('/login/role').set(validToken);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
});