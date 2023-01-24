import { Request, Response } from "express";
import { AuthService } from "./../services";

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const authenticationTokens = await AuthService.authenticate(
    username,
    password
  );
  res.status(200).json(authenticationTokens);
};

const refresh = async (req: Request, res: Response) => {
  const authenticationTokens = await AuthService.refresh(res.locals.user);
  res.status(200).json(authenticationTokens);
};

export { authenticate, refresh };
