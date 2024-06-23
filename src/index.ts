import express, { Request, Response } from 'express';
import { manageBuilder } from './api/manageBuilder';
import * as dotenv from 'dotenv';
dotenv.config();

export const app = express();
const port = 3000;

console.log(process.env.BUILD_INSTRUCTION);

app.use(express.json());

manageBuilder();

app.listen(port, () => {
  console.log(`Le serveur Express écoute sur le port ${port}`);
});
