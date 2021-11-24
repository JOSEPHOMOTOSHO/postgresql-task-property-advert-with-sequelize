import { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";

interface Requestextended extends Request{
    User?:{}
}

const isSignedIn = (req:Requestextended,res:Response,next:NextFunction) =>{
let storedDetails = req.cookies
const verifiedUser = Jwt.verify(storedDetails.jwt,process.env.TOKEN_KEY as string)
req.User = verifiedUser
 next()
}

export default isSignedIn