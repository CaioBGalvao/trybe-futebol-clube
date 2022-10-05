import Teams from '../database/models/teams.model';
import { ITeams } from '../interfaces';

class TeamsService {
  private teamsModel = Teams;

  public getAll = async (): Promise<ITeams[]> => {
    const result = await this.teamsModel.findAll({
      // logging: console.log,
      attributes: ['id', 'teamName'],
      raw: true,
    });

    if (!result) {
      throw new Error('There are no teams registered&404');
    }

    return result;
  };

  public getByPk = async (id: string): Promise<ITeams> => {
    const result = await this.teamsModel.findByPk(id, {
      // logging: console.log,
      attributes: ['id', 'teamName'],
      raw: true,
    });

    if (!result) {
      throw new Error('Team not found&404');
    }

    return result;
  };
}

export default TeamsService;
