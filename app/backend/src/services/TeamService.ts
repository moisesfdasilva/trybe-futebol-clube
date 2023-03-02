import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamModel';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async readById(id: number): Promise<Team | null> {
    const findTeam = this.model.findByPk(id);
    return findTeam;
  }
}

export default TeamService;
