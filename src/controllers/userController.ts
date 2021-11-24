import client from "../connection";
import { Request, Response } from "express";
import { createNewUser } from "../sqlQueries";
import bcrypt from "bcrypt";

const signupUser = async (
  req: Request,
  res: Response
): Promise<Response | undefined | void> => {
  const {
    email,
    password,
    first_name,
    last_name,
    phoneNumber,
    address,
    is_admin,
  } = req.body;
  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);
    client.query(
      createNewUser,
      [
        email,
        hashedPassword,
        first_name,
        last_name,
        phoneNumber,
        address,
        is_admin,
      ],
      (error, results) => {
       
        if (error) {
          return res.status(400).json({ status: "error", error, data: null });
        }
        return res.status(201).json({
          status: "success",
          data: {
            id: results.rows[0].id,
            first_name,
            last_name,
            email,
          },
          error: null,
        });
      }
    );
  } catch (error) {
    return res.status(400).send({ status: "error", error, data: null });
  }
};

export { signupUser };
