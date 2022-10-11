import * as express from 'express';
import { HomeController } from '../controllers';
import { HomeService } from '../services';

const homeService = new HomeService();
const homeController = new HomeController(homeService);

class HomeRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', homeController.getAll);
  }
}

export default HomeRoute;
