import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';
import Match from '../database/models/MatchModel';

import {
  matchesListMock,
  matchesListInProgMock,
  matchesListNotInProgMock,
  inputFinishedMatch,
  inputMatchMock,
  validOutputMatchMock,
  inputMatchSameTeamMock,
} from './mocks/matchesMock';
import { validToken } from './mocks/tokenMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('3. Teste da rota /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('3.1. Deve retornar status 200 e os dados de todas as partidas.', async function () {
    sinon.stub(Model, 'findAll').resolves(matchesListMock);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesListMock);
  });

  it('3.2. Deve retornar status 200 e os dados de todas as partidas em andamento.',
  async function () {
    sinon.stub(Model, 'findAll').resolves(matchesListInProgMock);

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesListInProgMock);
  });

  it('3.3. Deve retornar status 200 e os dados de todas as partidas finalizadas.',
  async function () {
    sinon.stub(Model, 'findAll').resolves(matchesListNotInProgMock);

    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesListNotInProgMock);
  });

  it('3.4. Ao finalizar uma partida deve retornar status 200 e a mensagem "Finished".',
  async function () {
    sinon.stub(Model, 'update').resolves([1]);

    const response = await chai.request(app).patch('/matches/1/finish').set(validToken);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });

  it(`3.5. Ao enviar os dados da partida finalizada deve retornar status 200 e os dados da
  partida`, async function () {
    sinon.stub(Model, 'update').resolves([1]);

    const response = await chai.request(app).patch('/matches/1')
      .set(validToken)
      .send(inputFinishedMatch);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ id: 1, ...inputFinishedMatch });
  });

  it(`3.6. Ao inserir os dados da partida deve retornar status 200 e os dados da
  partida`, async function () {
    sinon.stub(Model, 'create').resolves(validOutputMatchMock as Match);

    const response = await chai.request(app).post('/matches')
      .set(validToken)
      .send(inputMatchMock);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(validOutputMatchMock.dataValues);
  });

  it(`3.7. Ao inserir os dados da partida, com o mesmo time jogando em casa e fora, deve retornar
  status 422 e mensagem que não é possível criar uma partida com o mesmo time.`, async function () {
    const response = await chai.request(app).post('/matches')
      .set(validToken)
      .send(inputMatchSameTeamMock);

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({
      message: 'It is not possible to create a match with two equal teams',
    });
  });

  it(`3.8. Ao inserir os dados da partida, com algum id inexistente, deve retornar status 404 e a
  mensagem "There is no team with such id!"`, async function () {
    sinon.stub(Model, 'findAll').resolves([]);

    const response = await chai.request(app).post('/matches')
      .set(validToken)
      .send(inputMatchMock);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({
      message: 'There is no team with such id!',
    });
  });
});