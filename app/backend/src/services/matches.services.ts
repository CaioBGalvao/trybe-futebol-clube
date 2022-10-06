import Teams from '../database/models/teams.model';
import IMatch from '../interfaces/IMatch';
import Matches from '../database/models/matches.model';

const teams: number[] = [];

class MatchesService {
  private matchesModel = Matches;
  private teamsModel = Teams;

  public getAll = async (): Promise<IMatch[]> => {
    const matches = await this.matchesModel.findAll();
    return matches;
  };

  public getInProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
    });
    return matches;
  };

  public postMatchInProgress = async (match: IMatch): Promise<IMatch> => {
    if (match.homeTeam === match.awayTeam) {
      throw new Error('It is not possible to create a match with two equal teams&401');
    }

    teams.push(match.homeTeam);
    teams.push(match.awayTeam);

    const isAllOk = await Promise
      .all(teams
        .map((teamId) => this.teamsModel
          .findOne(
            { where: { id: teamId } },
          )));

    if (isAllOk.includes(null)) {
      throw new Error('There is no team with such id!&404');
    }

    const createdMatch = await this.matchesModel.create(match);

    const newMatch = { id: createdMatch.id, ...match };

    return newMatch;
  };

  public finishMatch = async (id: string): Promise<boolean> => {
    const match = await this.matchesModel.findOne({
      attributes: ['id'],
      where: { id },
    });

    if (!match) {
      return false;
    }

    await this.matchesModel.update({ inProgress: false }, { where: { id: match.id } });

    return true;
  };

  public goalUpdate = async (
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<boolean> => {
    const match = await this.matchesModel.findOne({
      attributes: ['id', 'inProgress'],
      where: { id },
    });

    if (!match) {
      return false;
    }

    if (match.inProgress === false) {
      throw new Error('Match is already finished!&400');
    }

    await this.matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id: match.id } });

    return true;
  };
}

export default MatchesService;
