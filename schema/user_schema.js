import joi from "joi";

export const userSchema = joi.object({
   
    userName: joi.string(),
    email: joi.string().email(),
    password: joi.string().min(4).required(),
    confirmPassword: joi.ref('password')
})

