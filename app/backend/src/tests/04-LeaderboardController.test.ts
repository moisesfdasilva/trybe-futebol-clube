import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

import { matchOutputMock } from './mocks/matchesMock';
import { teamListMacthMock } from './mocks/teamsMock';
import {
  HomeLeaderboardOutputMock,
  AwayLeaderboardOutputMock,
  LeaderboardOutputMock,
} from './mocks/leaderboardMoch';

chai.use(chaiHttp);
const { expect } = chai;

describe('4. Teste da rota leaderboard:', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('4.1. Deve retornar uma lista com a classificação por time mandante.', async function () {
    sinon.stub(Match, 'findAll').resolves(matchOutputMock as Match[]);
    sinon.stub(Team, 'findAll').resolves(teamListMacthMock as Team[]);

    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(HomeLeaderboardOutputMock);
  });

  it('4.2. Deve retornar uma lista com a classificação por time visitante.', async function () {
    sinon.stub(Match, 'findAll').resolves(matchOutputMock as Match[]);
    sinon.stub(Team, 'findAll').resolves(teamListMacthMock as Team[]);

    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(AwayLeaderboardOutputMock);
  });

  it('4.3. Deve retornar uma lista com a classificação geral dos times.', async function () {
    sinon.stub(Match, 'findAll').resolves(matchOutputMock as Match[]);
    sinon.stub(Team, 'findAll').resolves(teamListMacthMock as Team[]);

    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(LeaderboardOutputMock);
  });
});