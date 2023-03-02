import Team from '../database/models/TeamModel';

interface IServiceTeam {
  readAll(): Promise<Team[]>;
}

export default IServiceTeam;
