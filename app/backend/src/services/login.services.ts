import * as bcrypt from 'bcryptjs';
import Users from '../database/models/users.model';
import ILogin from '../interfaces';
import validateLogin from '../Schema/loginSchema';
import { createToken } from '../utils/token';

class LoginService {
  private usersModel = Users;

  public login = async (userObject: ILogin): Promise<string> => {
    const validationResult = validateLogin(userObject);

    const { email, password } = validationResult;

    const user = await this.usersModel.findOne({
      // logging: console.log,
      attributes: ['email', 'password'],
      where: { email },
      raw: true,
    });

    if (!user) {
      throw new Error('Incorrect email or password&401');
    }

    if (!bcrypt.compareSync(password, user?.password)) {
      throw new Error('Incorrect email or password&401');
    }

    return createToken({ email });
  };

  public getUser = async (email: string): Promise<string> => {
    const result = await this.usersModel.findOne({
      // logging: console.log,
      attributes: ['role'],
      where: { email },
      raw: true,
    });

    if (!result) {
      throw new Error('User not found&404');
    }

    return result.role;
  };
}

export default LoginService;
