import { NextFunction, Request, Response } from "express";
import {SignInSchema} from '../utils/validate'

const SignInValidator = (req:Request,res:Response,next:NextFunction):Response|void =>{
    const { email, password } = req.body;
    const { error } = SignInSchema.validate({ email, password });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next()
}


export default SignInValidator