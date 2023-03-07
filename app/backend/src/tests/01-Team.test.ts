import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';

import { teamsListMock, teamMock } from './mocks/teamsMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('1. Teste da rota teams:', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('1.1. Deve retornar uma lista com todos os times.', async function () {
    sinon.stub(Model, 'findAll').resolves(teamsListMock);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsListMock);
  });

  it('1.2. Deve retornar o time pelo id.', async function () {
    sinon.stub(Model, 'findOne').resolves(teamMock);

    const response = await chai.request(app).get('/teams/777');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamMock);
  });
});