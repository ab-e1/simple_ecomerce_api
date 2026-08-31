import { z } from "zod";

const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userSchema = z.object({
  name: z.string().min(1, "name cannot be empty"),
  email: z
    .string()
    .regex(emailregex, "invalid email"),
  password: z
    .string()
    .min(8, "apssword must be 8 charcters long")
    .regex(/[A-Z]/, "password must contain atleast one capital letter")
    .regex(/[a-z]/, "password must contain atleat one small letter")
    .regex(/\d/, "password must contain atleast one number")
    .regex(/[#!@$%&*^+_-]/, "password must contain atleast one special charcater")
})
