import Match from '../../database/models/MatchModel';
import IMatchOutput from '../../interfaces/IMatchOutput';

interface IInputFinishedMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IOutputMatch {
  dataValues: Match,
}

const matchesListMock = [
  { id: 1, homeTeamId: 1, homeTeamGoals: 2, awayTeamId: 2, awayTeamGoals: 1, inProgress: false },
  { id: 2, homeTeamId: 2, homeTeamGoals: 2, awayTeamId: 1, awayTeamGoals: 1, inProgress: false },
  { id: 3, homeTeamId: 3, homeTeamGoals: 3, awayTeamId: 1, awayTeamGoals: 0, inProgress: true },
] as Match[];

const matchesListInProgMock = [
  { id: 3, homeTeamId: 3, homeTeamGoals: 3, awayTeamId: 1, awayTeamGoals: 0, inProgress: true },
] as Match[];

const matchesListNotInProgMock = [
  { id: 1, homeTeamId: 1, homeTeamGoals: 2, awayTeamId: 2, awayTeamGoals: 1, inProgress: false },
  { id: 2, homeTeamId: 2, homeTeamGoals: 2, awayTeamId: 1, awayTeamGoals: 1, inProgress: false },
] as Match[];

const inputFinishedMatch: IInputFinishedMatch = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
}

const inputMatchMock = {
  homeTeamId: 1,
  homeTeamGoals: 2,
  awayTeamId: 2,
  awayTeamGoals: 1,
  inProgress: false,
} as Match;

const insideValidOutputMatchMock = {
  homeTeamId: 1,
  homeTeamGoals: 2,
  awayTeamId: 2,
  awayTeamGoals: 1,
  inProgress: false,
} as Match;

const validOutputMatchMock: IOutputMatch = {
  dataValues: insideValidOutputMatchMock,
}

const inputMatchSameTeamMock = {
  homeTeamId: 1,
  homeTeamGoals: 2,
  awayTeamId: 1,
  awayTeamGoals: 1,
  inProgress: false,
} as Match;

const matchOutputMock: IMatchOutput[] = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: { teamName: 'Aum' },
    awayTeam: { teamName: 'Adois' },
  },
  {
    id: 2,
    homeTeamId: 3,
    homeTeamGoals: 2,
    awayTeamId: 4,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: { teamName: 'Adois' },
    awayTeam: { teamName: 'Aum' },
  },
];

export {
  matchesListMock,
  matchesListInProgMock,
  matchesListNotInProgMock,
  inputFinishedMatch,
  inputMatchMock,
  validOutputMatchMock,
  inputMatchSameTeamMock,
  matchOutputMock,
};
