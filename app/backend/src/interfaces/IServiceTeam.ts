import Team from '../database/models/TeamModel';

interface IServiceTeam {
  readAll(): Promise<Team[]>;
  readById(id: number): Promise<Team | null>;
}

export default IServiceTeam;
