import { Request, Response } from 'express';
import { HomeService } from '../services';

class HomeController {
  constructor(private homeService: HomeService) {}

  public getAll = async (req: Request, res: Response) => {
    const response = await this.homeService.getLeaderboardHome();
    res.status(200).send(response);
  };
}

export default HomeController;
