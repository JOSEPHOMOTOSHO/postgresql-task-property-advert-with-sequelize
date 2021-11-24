import { NextFunction, Request, Response } from "express";
import client from "../connection";
import { getUser } from "../sqlQueries";

const doesUserExists = (req: Request, res: Response, next: NextFunction):Response|void=> {
  console.log("yam and egg")

  const { email } = req.body;
  client.query(getUser, [email], async (error, results):Promise<Response|undefined|void> => {

    if (results.rows.length) {
      return res.status(409).send(`User with email ${email} already exists`);
    }
    next();
  });
};

export default doesUserExists;
