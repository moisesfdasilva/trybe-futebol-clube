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

chai.use(chaiHttp);
const { expect } = chai;

describe('2. Teste da rota login:', () => {
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
});