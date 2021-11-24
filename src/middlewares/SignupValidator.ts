import { NextFunction, Request, Response } from "express";
import {SignupSchema} from "../utils/validate"

const SignUpValidator = (req:Request,res:Response,next:NextFunction):Response|void =>{
    const { email, password } = req.body;
    const { error } = SignupSchema.validate({ email, password });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next()
}

export default SignUpValidator