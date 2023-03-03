import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import IServiceMatch from '../interfaces/IServiceMatch';
import IMatchOutput from '../interfaces/IMatchOutput';
import Team from '../database/models/TeamModel';

class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async readAll(): Promise<IMatchOutput[]> {
    return this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }
}

export default MatchService;
