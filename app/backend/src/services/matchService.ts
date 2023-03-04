import { ModelStatic, Op } from 'sequelize';
import Match from '../database/models/MatchModel';
import IServiceMatch from '../interfaces/IServiceMatch';
import IMatchOutput from '../interfaces/IMatchOutput';
import Team from '../database/models/TeamModel';
import IMatchInProgress from '../interfaces/IMatchInProgress';
import IMatch from '../interfaces/IMatch';

class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;
  protected modelTeam: ModelStatic<Team> = Team;

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
    await this.model.update({
      id: matchInProgress.id,
      homeTeamGoals: matchInProgress.homeTeamGoals,
      awayTeamGoals: matchInProgress.awayTeamGoals,
    }, {
      where: { id: matchInProgress.id },
    });
    return matchInProgress;
  }

  async insertMatch(match: IMatch): Promise<IMatch> {
    const newMatch = await this.model.create({
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    return newMatch.dataValues;
  }

  async getTeamsMatch(homeTeamId: number, awayTeamId:number): Promise<number> {
    const teams = await this.modelTeam.findAll({
      where: { [Op.or]: [{ id: homeTeamId }, { id: awayTeamId }] },
    });
    console.log(teams.length);
    return teams.length;
  }
}

export default MatchService;
