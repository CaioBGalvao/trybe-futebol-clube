import { IMatchesPoints } from '../../interfaces';
import getGames from './totalGames';
import getTotal from './totalPoints';

const efficiencyHome = async (result: IMatchesPoints) => {
  const totalGames = await getGames(result);
  const totalPoints = await getTotal(result);
  const tipleTotalGames = totalGames * 3;
  const dividedTotalPoints = totalPoints / tipleTotalGames;
  const percentage = dividedTotalPoints * 100;
  const efficiency = percentage.toFixed(2);
  return efficiency;
};

export default efficiencyHome;
