import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { LoginRoute, TeamsRoute } from './routes';
import 'express-async-errors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // minhas rotas
    this.app.use('/login', new LoginRoute().router);
    this.app.use('/teams', new TeamsRoute().router);

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    this.app.use((
      err: Error,
      _req: Request,
      res: Response,
      _next: NextFunction,
    ) => {
      console.error(err.message);
      if (err.message.includes('&')) {
        const [message, statusCode] = err.message.split('&');
        return res.status(Number(statusCode)).json({ message });
      }
      res.status(500).json({ message: 'Internal server error' });
    });
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
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
