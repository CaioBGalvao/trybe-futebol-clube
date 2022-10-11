import { IMatchesPoints } from '../../interfaces';

const getTotalFavor = async (result: IMatchesPoints) => {
  let points = 0;
  result.teamHome.forEach((goal: any) => {
    points += goal.homeTeamGoals;
  });

  return points as number;
};

export default getTotalFavor;
