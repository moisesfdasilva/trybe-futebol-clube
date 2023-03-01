import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
// import { Model } from 'sequelize';
import { App } from '../app';
import { teamsListMock } from './mocks/teamsService.mock';

chai.use(chaiHttp);

describe('1. Teste da rota teams:', () => {
  const app = new App();
  afterEach(()=>{
    Sinon.restore();
  });
  it('1.1. Deve retornar uma lista com todos os times.', async () => {
    const teamsList = teamsListMock;

    const response = await chai.request(app.app).get('/teams').send(teamsList);

    expect(response.status).to.be.equal(200);
  });
});