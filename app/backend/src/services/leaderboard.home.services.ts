import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { ILeaderBoard } from '../interfaces';
import {
  getTotal,
  getDraws,
  getGames,
  getVictories,
  getLosses,
  getTotalFavor,
  getGoalsOwn,
  getTotalGoals,
  efficiencyHome,
} from './utils';

const findAllOptions = {
  include: [{ model: Matches,
    as: 'teamHome',
    where: { inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'] }],
};

class HomeService {
  private teamsModel = Teams;

  public getLeaderboardHome = async (): Promise<ILeaderBoard[]> => {
    const matchesPoints = await Teams.findAll(findAllOptions);
    const leaderResult = (Promise.all(matchesPoints.map(async (matches) => ({
      name: matches.teamName,
      totalPoints: await getTotal(matches),
      totalGames: await getGames(matches),
      totalVictories: await getVictories(matches),
      totalDraws: await getDraws(matches),
      totalLosses: await getLosses(matches),
      goalsFavor: await getTotalFavor(matches),
      goalsOwn: await getGoalsOwn(matches),
      goalsBalance: await getTotalGoals(matches),
      efficiency: await efficiencyHome(matches),
    }))));
    const final = (await leaderResult).sort((a, b) =>
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
      || b.totalGames + a.totalGames);

    return final as unknown as ILeaderBoard[];
  };
}

export default HomeService;
