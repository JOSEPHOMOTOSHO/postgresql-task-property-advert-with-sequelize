import Joi, { Root } from 'joi'



const SignupSchema = Joi.object({
    firstname:Joi.string().min(2).max(100),
    lastname:Joi.string().min(1).max(100),
    email:Joi.string().min(1).max(255).email().required(),
    password:Joi.string().min(6).required()
})


const SignInSchema = Joi.object({
    email:Joi.string().min(1).max(255).email().required(),
    password:Joi.string().min(6).required()
})

export  {SignupSchema,SignInSchema}