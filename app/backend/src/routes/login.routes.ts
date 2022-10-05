import * as express from 'express';
import { LoginController } from '../controllers';
import { LoginService } from '../services';
import { validateToken } from '../utils/token';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

class LoginRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/', loginController.login);
    this.router.get('/validate', validateToken, loginController.getUser);
  }
}

export default LoginRoute;
