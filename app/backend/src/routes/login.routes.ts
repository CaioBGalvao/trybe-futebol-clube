import * as express from 'express';
import LoginController from '../controllers';
import LoginService from '../services';
import { validateToken } from '../utils/token';

const loginService = new LoginService();
const usersController = new LoginController(loginService);

class LoginRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/', usersController.login);
    this.router.get('/validate', validateToken, usersController.getUser);
  }
}

export default LoginRoute;
