import { IMatchesPoints } from '../../interfaces';

const getGoalsOwn = async (result: IMatchesPoints) => {
  let points = 0;
  result.teamHome.forEach((goal: any) => {
    points += goal.awayTeamGoals;
  });

  return points as number;
};

export default getGoalsOwn;
