import ILeaderboardOutput from '../../interfaces/ILeaderboardOutput';
const HomeLeaderboardOutputMock: ILeaderboardOutput[] = [
  {
    name: 'Aum',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33',
  },
  {
    name: 'Adois',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 'NaN',
  },
];

const AwayLeaderboardOutputMock: ILeaderboardOutput[] = [
  {
    name: 'Adois',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33',
  },
  {
    name: 'Aum',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 'NaN',
  },
];

const LeaderboardOutputMock: ILeaderboardOutput[] = [
  {
    name: 'Aum',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33',
  },
  {
    name: 'Adois',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33',
  },
];

export {
  HomeLeaderboardOutputMock,
  AwayLeaderboardOutputMock,
  LeaderboardOutputMock,
};