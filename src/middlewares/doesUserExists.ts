import { NextFunction, Request, Response } from "express";
import { Users } from "../../models/users";

const doesUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  console.log("yam and egg");

  const { email } = req.body;

  const user = await Users.findOne({
    where: {
      email,
    },
  });

  console.log(user);
  if (user) {
    return res.status(409).send(`User with email ${email} already exists`);
  }
  next();
};

export default doesUserExists;
