import { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";

interface Requestextended extends Request{
    User?:{}
}

const isSignedIn = (
  req: Requestextended,
  res: Response,
  next: NextFunction
): Response | void => {
  let storedDetails = req.cookies;
  if (!Object.keys(storedDetails).length) {
    return res.status(400).send({ message: "You are not signed In" });
  }
  const verifiedUser = Jwt.verify(
    storedDetails.jwt,
    process.env.TOKEN_KEY as string
  );
  if (!verifiedUser) {
    return res.status(400).send({ messgae: "Authentication error" });
  }
  req.User = verifiedUser;
  next();
};

export default isSignedIn