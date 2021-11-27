import { Users } from "../../models/users";
import { Request, Response } from "express";
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

    const user = Users.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phoneNumber,
      address,
      is_admin,
    }).then((data:any)=>{
      return res.status(201).json({
        status: "success",
        data: {
          id: data.id,
          first_name:data.first_name,
          last_name:data.last_nam,
          email:data.email,
        },
        error: null,
      });
    }).catch((error:any)=>{
      return res.status(400).send({ status: "error", error, data: null });
    })
    
  } catch (error) {
    return res.status(400).send({ status: "error", error, data: null });
  }
};

export { signupUser };
