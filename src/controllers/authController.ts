import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../connection";
import { getUser } from "../sqlQueries";

const secret = process.env.TOKEN_KEY;

const signin = async (
  req: Request,
  res: Response
): Promise<Response | undefined | void> => {
    
  try {
    const { email, password } = req.body;
    client.query(getUser, [email], (error, results) => {
      if (error) {
        return res.status(400).json({ status: "error", error });
      }
      if (!results.rows.length) return res.status(400).send("invalid email");
      if (results.rows[0].password) {
        const valid = bcrypt.compare(password, results.rows[0].password);
        if (!valid) return res.status(400).send("Invalid email or password");
        const token = jwt.sign({ id: results.rows[0].id }, secret as string, {
          expiresIn: "72000000 seconds",
        });

        res.cookie("jwt", token);
        return res.status(200).json({
          status: "success",
          data: {
            token,
            id: results.rows[0].id,
            email: results.rows[0].email,
            first_name: results.rows[0].first_name,
            last_name: results.rows[0].last_name,
          },
        });
      } else {
        return res.status(400).send("Invalid Email or Password");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      error: "Server error",
      err,
      data: null,
    });
  }
};

export default signin;
