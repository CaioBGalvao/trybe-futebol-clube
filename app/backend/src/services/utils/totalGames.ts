import { IMatchesPoints } from '../../interfaces';

const getGames = async (result: IMatchesPoints) => {
  let points = 0;
  points += result.teamHome.length;

  return points as number;
};

export default getGames;
