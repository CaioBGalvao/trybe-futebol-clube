import { IMatchesPoints } from '../../interfaces';

const getDraws = async (result: IMatchesPoints) => {
  let points = 0;
  result.teamHome.forEach((goal: any) => {
    if (goal.homeTeamGoals === goal.awayTeamGoals) points += 1;
  });

  return points as number;
};

export default getDraws;
