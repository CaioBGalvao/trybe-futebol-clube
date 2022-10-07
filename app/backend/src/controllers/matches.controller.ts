import { Request, Response } from 'express';
import IMatch from '../interfaces/IMatch';
import { MatchesService } from '../services';

const matchNotFound = 'Match not found';

class MatchesController {
  constructor(private matchesService: MatchesService) {}

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.getAll();
    return res.status(200).json(matches);
  };

  public getInProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (!inProgress || (inProgress !== 'true' && inProgress !== 'false')) {
      return this.getAll(req, res);
    }

    const inProgressOption = JSON.parse(inProgress);
    // const query = inProgress === 'true';

    const filteredMatches = await this
      .matchesService.getInProgress(inProgressOption);

    return res.status(200).json(filteredMatches);
  };

  public postMatchInProgress = async (req: Request, res: Response) => {
    const match: IMatch = req.body;

    if (!match) {
      return res.status(400).json({ message: matchNotFound });
    }
    match.inProgress = true;
    const newMatch = await this.matchesService.postMatchInProgress(match);

    return res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const finishStatus = await this.matchesService.finishMatch(id);

    if (!finishStatus) {
      return res.status(404).json({ message: matchNotFound });
    }

    return res.status(200).json({ message: 'Finished' });
  };

  public goalUpdate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await this.matchesService.goalUpdate(id, homeTeamGoals, awayTeamGoals);

    if (!updatedMatch) {
      return res.status(404).json({ message: matchNotFound });
    }

    return res.status(200).json({ message: 'Goals updated' });
  };
}

export default MatchesController;
