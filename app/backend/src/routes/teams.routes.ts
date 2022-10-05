import * as express from 'express';
import { TeamsController } from '../controllers';
import { TeamsService } from '../services';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

class TeamsRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', teamsController.getAll);
    this.router.get('/:id', teamsController.getByPk);
  }
}

export default TeamsRoute;
