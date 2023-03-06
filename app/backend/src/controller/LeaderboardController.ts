import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import IMatchOutput from '../interfaces/IMatchOutput';
import Team from '../database/models/TeamModel';
import ILeaderboardOutput from '../interfaces/ILeaderboardOutput';

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

  static getHomeMatches(arrayMatches: IMatchOutput[], allTeams: Team[]): ILeaderboardOutput[] {
    const matchesPoints = LeaderboardController.arrayMatchesPoints(arrayMatches);
    const result = allTeams.map((team) => {
      const matches = matchesPoints.filter((match) => (match.homeTeamName === team.teamName));
      const objTeam = {
        name: team.teamName,
        totalPoints: matches.reduce((sum, { homePoint }) => sum + homePoint, 0),
        totalGames: matches.length,
        totalVictories: (matches.filter((match) => (match.homePoint === 3))).length,
        totalDraws: (matches.filter((match) => (match.homePoint === 1))).length,
        totalLosses: (matches.filter((match) => (match.homePoint === 0))).length,
        goalsFavor: matches.reduce((sum, { homeTeamGoals }) => sum + homeTeamGoals, 0),
        goalsOwn: matches.reduce((sum, { awayTeamGoals }) => sum + awayTeamGoals, 0),
      };
      return { ...objTeam,
        goalsBalance: objTeam.goalsFavor - objTeam.goalsOwn,
        efficiency: ((objTeam.totalPoints / (objTeam.totalGames * 3)) * 100).toFixed(2) };
    });
    return result;
  }

  static classificationSort(a: ILeaderboardOutput, b: ILeaderboardOutput) {
    const comparePoints = b.totalPoints - a.totalPoints;
    const compareWins = b.totalVictories - a.totalVictories;
    const compareGoalsBalance = b.goalsBalance - a.goalsBalance;
    const compareGoalsFavor = b.goalsFavor - a.goalsFavor;
    if (comparePoints !== 0) { return b.totalPoints - a.totalPoints; }
    if (compareWins !== 0) { return b.totalVictories - a.totalVictories; }
    if (compareGoalsBalance !== 0) { return b.goalsBalance - a.goalsBalance; }
    if (compareGoalsFavor !== 0) { return b.goalsFavor - a.goalsFavor; }
    return b.goalsOwn - a.goalsOwn;
  }

  static getAwayMatches(arrayMatches: IMatchOutput[], allTeams: Team[]): ILeaderboardOutput[] {
    const matchesPoints = LeaderboardController.arrayMatchesPoints(arrayMatches);
    const result = allTeams.map((team) => {
      const matches = matchesPoints.filter((match) => (match.awayTeamName === team.teamName));
      const objTeam = {
        name: team.teamName,
        totalPoints: matches.reduce((sum, { awayPoint }) => sum + awayPoint, 0),
        totalGames: matches.length,
        totalVictories: (matches.filter((match) => (match.awayPoint === 3))).length,
        totalDraws: (matches.filter((match) => (match.awayPoint === 1))).length,
        totalLosses: (matches.filter((match) => (match.awayPoint === 0))).length,
        goalsFavor: matches.reduce((sum, { awayTeamGoals }) => sum + awayTeamGoals, 0),
        goalsOwn: matches.reduce((sum, { homeTeamGoals }) => sum + homeTeamGoals, 0),
      };
      return { ...objTeam,
        goalsBalance: objTeam.goalsFavor - objTeam.goalsOwn,
        efficiency: ((objTeam.totalPoints / (objTeam.totalGames * 3)) * 100).toFixed(2) };
    });
    return result;
  }

  async getHomePerformances(_req: Request, res: Response) {
    const arrayMatches = await this._service.getMatchPerformance();
    const arrayFinishedMatches = arrayMatches.filter((match) => match.inProgress === false);
    const allTeams = await this._service.getAllTeams();
    const result = LeaderboardController.getHomeMatches(arrayFinishedMatches, allTeams);
    result.sort((a, b) => LeaderboardController.classificationSort(a, b));
    return res.status(200).json(result);
  }

  async getAwayPerformances(_req: Request, res: Response) {
    const arrayMatches = await this._service.getMatchPerformance();
    const arrayFinishedMatches = arrayMatches.filter((match) => match.inProgress === false);
    const allTeams = await this._service.getAllTeams();
    const result = LeaderboardController.getAwayMatches(arrayFinishedMatches, allTeams);
    result.sort((a, b) => LeaderboardController.classificationSort(a, b));
    return res.status(200).json(result);
  }
}

export default LeaderboardController;
