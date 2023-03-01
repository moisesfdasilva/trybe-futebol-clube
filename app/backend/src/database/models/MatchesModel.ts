import { Model, INTEGER, BOOLEAN } from 'sequelize';
import Teams from './TeamsModel';
import db from '.';

class Matches extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
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

Matches.belongsTo(Teams,{ foreignKey: 'home_team_id', as: 'homeId' });
Teams.hasMany(Matches,{ foreignKey: 'home_team_id', as: 'homeId' });

Matches.belongsTo(Teams,{ foreignKey: 'away_team_id', as: 'awayId' });
Teams.hasMany(Matches,{ foreignKey: 'away_team_id', as: 'awayId' });

export default Matches;