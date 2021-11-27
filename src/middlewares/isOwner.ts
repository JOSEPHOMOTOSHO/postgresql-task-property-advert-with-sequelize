import { NextFunction, Request, Response } from "express";
import { Users } from "../../models/users";

interface Requestextended extends Request {
  User?: {};
  image?: string | {};
  property?: {};
}
interface user {
  id: number;
}
interface property {
  owner?: number;
}

const isOwner = (
  req: Requestextended,
  res: Response,
  next: NextFunction
): Response | void => {
  const user = req.User as user;
  const property: property = req.property as property;
  if (user.id !== property.owner) {
    return res.status(400).send("You are not authorized to update this advert");
  }

  next();
};

export default isOwner;
