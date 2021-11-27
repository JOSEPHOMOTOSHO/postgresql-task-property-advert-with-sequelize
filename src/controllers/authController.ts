import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../../models/users";
const secret = process.env.TOKEN_KEY;

const signin = async (
  req: Request,
  res: Response
): Promise<Response | undefined | void> => {
  try {
    const { email, password } = req.body;
    const User = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!User) {
      return res.status(400).send("invalid email");
    }
    if (User.password) {
      const valid = bcrypt.compare(password, User.password);
      if (!valid) return res.status(400).send("Invalid email or password");
      const token = jwt.sign({ id: User.id }, secret as string, {
        expiresIn: "72000000 seconds",
      });
      res.cookie("jwt", token);
      return res.status(200).json({
        status: "success",
        data: {
          token,
          id: User.id,
          email: User.email,
          first_name: User.first_name,
          last_name: User.last_name,
        },
      });
    } else {
      return res.status(400).send("Invalid Email or Password");
    }
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
