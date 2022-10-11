import { IMatchesPoints } from '../../interfaces';

const getTotalGoals = async (result: IMatchesPoints) => {
  let points = 0;
  result.teamHome.forEach((goal: any) => {
    points += goal.homeTeamGoals - goal.awayTeamGoals;
  });

  return points as number;
};

export default getTotalGoals;
