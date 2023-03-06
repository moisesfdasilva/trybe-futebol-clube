import IMatchOutput from './IMatchOutput';
import Team from '../database/models/TeamModel';

interface IServiceLeaderboard {
  getMatchPerformance(): Promise<IMatchOutput[]>;
  getAllTeams(): Promise<Team[]>;
}

export default IServiceLeaderboard;
