import { Request, Response } from 'express';
import LoginService from '../services';

class LoginController {
  constructor(private loginService: LoginService) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userObject = { email, password };
    const result = await this.loginService.login(userObject);
    return res.status(200).json({ token: result });
  };

  public getUser = async (req: Request, res: Response) => {
    const { JwtPayload } = req.body;
    const { email } = JwtPayload;
    const result = await this.loginService.getUser(email);
    return res.status(200).json({ role: result });
  };
}

export default LoginController;
