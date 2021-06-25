import { Request, Response, NextFunction, request } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
};

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;
  
  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "91e7ba0944122122b9ac0ca48dd24e2f") as IPayload;

    req.user_id = sub;
    return next();
  } catch(err) {
    return res.status(401).end();
  }
}