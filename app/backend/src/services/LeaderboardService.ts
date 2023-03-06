import { ModelStatic } from 'sequelize';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import IMatchOutput from '../interfaces/IMatchOutput';

class LeaderboardService implements IServiceLeaderboard {
  protected modelMatch: ModelStatic<Match> = Match;
  protected modelTeam: ModelStatic<Team> = Team;

  async getMatchPerformance(): Promise<IMatchOutput[]> {
    return this.modelMatch.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

  async getAllTeams(): Promise<Team[]> {
    return this.modelTeam.findAll();
  }
}

export default LeaderboardService;
