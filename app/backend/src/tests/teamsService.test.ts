import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import { Model } from 'sequelize';
import { App } from '../app';
import Team from '../database/models/TeamModel';
import { teamsListMock } from './mocks/teamsService.mock';

chai.use(chaiHttp);

describe('1. Teste da rota teams:', () => {
  const app = new App();
  afterEach(()=>{
    Sinon.restore();
  });

  it('1.1. Deve retornar uma lista com todos os times.', async () => {
    Sinon
      .stub(Model, 'findAll')
      .resolves(teamsListMock as Team[]);

    const response = await chai.request(app.app).get('/teams').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsListMock);
  });
});