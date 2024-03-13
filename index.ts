import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur mon serveur Express en TypeScript !');
});

app.use((req: Request, res: Response) => {
  res.status(404).send("La ressource demandée n'a pas été trouvée.");
});

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send("Une erreur s'est produite !");
});

app.listen(port, () => {
  console.log(`Le serveur Express écoute sur le port ${port}`);
});
