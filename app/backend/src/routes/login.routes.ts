import * as express from 'express';
import { LoginController } from '../controllers';
import { LoginService } from '../services';
import Token from '../utils/token';

const loginService = new LoginService();
const loginController = new LoginController(loginService);
const token = new Token(true);

class LoginRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/', loginController.login);
    this.router.get('/validate', token.validateToken, loginController.getUser);
  }
}

export default LoginRoute;
