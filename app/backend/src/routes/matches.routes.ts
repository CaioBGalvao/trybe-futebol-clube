import * as express from 'express';
import { MatchesController } from '../controllers';
import { MatchesService } from '../services';
import Token from '../utils/token';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);
const token = new Token();

class MatchesRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', matchesController.getInProgress);
    this.router.post('/', token.validateToken, matchesController.postMatchInProgress);
    this.router.patch('/:id/finish', matchesController.finishMatch);
    this.router.patch('/:id', matchesController.goalUpdate);
  }
}

export default MatchesRoute;
