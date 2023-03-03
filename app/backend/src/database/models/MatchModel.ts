import { Model, INTEGER, BOOLEAN } from 'sequelize';
import Team from './TeamModel';
import db from '.';

class Match extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    primaryKey: true,
    type: INTEGER,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    allowNull: false,
    primaryKey: true,
    type: INTEGER,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'matches',
});

Match.belongsTo(Team, { foreignKey: 'home_team_id', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'home_team_id', as: 'homeTeam' });

Match.belongsTo(Team, { foreignKey: 'away_team_id', as: 'awayTeam' });
Team.hasMany(Match, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default Match;
