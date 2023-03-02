import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamModel';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return await this.model.findAll();
  }
}

export default TeamService;
