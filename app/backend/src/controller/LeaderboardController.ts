import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import IMatchOutput from '../interfaces/IMatchOutput';
import Team from '../database/models/TeamModel';

class LeaderboardController {
  private _service: IServiceLeaderboard;
  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  static arrayMatchesPoints(matches: IMatchOutput[]) {
    const result = matches.map((match) => {
      let points = [1, 1];
      if (match.homeTeamGoals > match.awayTeamGoals) {
        points = [3, 0];
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
        points = [0, 3];
      }
      return ({
        homeTeamGoals: match.homeTeamGoals,
        homeTeamName: match.homeTeam === undefined ? undefined : match.homeTeam.teamName,
        awayTeamGoals: match.awayTeamGoals,
        awayTeamName: match.awayTeam === undefined ? undefined : match.awayTeam.teamName,
        homePoint: points[0],
        awayPoint: points[1],
      });
    });
    return result;
  }

  static getMatchPerformance(arrayMatches: IMatchOutput[], allTeams: Team[]) {
    const matchesPoints = LeaderboardController.arrayMatchesPoints(arrayMatches);
    const result = allTeams.map((team) => {
      const matches = matchesPoints.filter((match) => (match.homeTeamName === team.teamName));
      return {
        name: team.teamName,
        totalPoints: matches.reduce((sum, { homePoint }) => sum + homePoint, 0),
        totalGames: matches.length,
        totalVictories: (matches.filter((match) => (match.homePoint === 3))).length,
        totalDraws: (matches.filter((match) => (match.homePoint === 1))).length,
        totalLosses: (matches.filter((match) => (match.homePoint === 0))).length,
        goalsFavor: matches.reduce((sum, { homeTeamGoals }) => sum + homeTeamGoals, 0),
        goalsOwn: matches.reduce((sum, { awayTeamGoals }) => sum + awayTeamGoals, 0),
      };
    });
    return result;
  }

  async getHomePerformances(_req: Request, res: Response) {
    const arrayMatches = await this._service.getMatchPerformance();
    const allTeams = await this._service.getAllTeams();
    const result = LeaderboardController.getMatchPerformance(arrayMatches, allTeams);
    return res.status(200).json(result);
  }
}

export default LeaderboardController;
