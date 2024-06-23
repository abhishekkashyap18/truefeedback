import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "username must be atleast of 2 characters")
    .max(20, "username must be no more than 20 character")
    .regex(/^[a-zA-z0-9_]+$/, "username must not contain special character")


/*
yaha p object bnaya kyuki 3-4 cheezein validate krni hai
uper sirf username validate kara tha isliye direct validate krdi thi
*/
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string()
            .email({message: "Invalid email address"}),
    password: z.string()
               .min(6, {message: "password must be atleast six characters"})
    
})