import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { LoginRoute, MatchesRoute, TeamsRoute, HomeRoute } from './routes';
import 'express-async-errors';
import middlewareError from './middleware/middleware.error';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // minhas rotas
    this.app.use('/login', new LoginRoute().router);
    this.app.use('/teams', new TeamsRoute().router);
    this.app.use('/matches', new MatchesRoute().router);
    this.app.use('/leaderboard/home', new HomeRoute().router);

    // Não remover essa rota
    this.app.get('/', (_req: Request, res: Response) => res.json({ ok: true }));

    this.app.use(middlewareError);
  }

  private config(): void {
    const accessControl: express
      .RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
        res.header('Access-Control-Allow-Headers', '*');
        next();
      };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
