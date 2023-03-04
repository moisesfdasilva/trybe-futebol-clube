import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import IServiceMatch from '../interfaces/IServiceMatch';
import IMatchOutput from '../interfaces/IMatchOutput';
import Team from '../database/models/TeamModel';
import IMatchInProgress from '../interfaces/IMatchInProgress';

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

  async readInProgress(progress: string): Promise<IMatchOutput[]> {
    const matchProgess = progress.includes('true') ? (
      progress.includes('true')) : !progress.includes('false');
    return this.model.findAll({
      where: { inProgress: matchProgess },
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

  async uploadInProgress(id: number): Promise<string> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }

  async uploadInProgressData(matchInProgress: IMatchInProgress): Promise<IMatchInProgress> {
    const aa = await this.model.update({
      id: matchInProgress.id,
      homeTeamGoals: matchInProgress.homeTeamGoals,
      awayTeamGoals: matchInProgress.awayTeamGoals,
    }, {
      where: { id: matchInProgress.id },
    });
    console.log(aa);
    return matchInProgress;
  }
}

export default MatchService;
