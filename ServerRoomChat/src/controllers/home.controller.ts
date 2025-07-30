import { Request, Response } from 'express';

export const home = (_req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
};
