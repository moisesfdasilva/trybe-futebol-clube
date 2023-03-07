import Match from '../../database/models/MatchModel';

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

export {
  matchesListMock,
  matchesListInProgMock,
  matchesListNotInProgMock,
  inputFinishedMatch,
  inputMatchMock,
  validOutputMatchMock,
  inputMatchSameTeamMock,
};
