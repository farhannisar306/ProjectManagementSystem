import { z } from "zod";
import { minimum_password_length } from "../../../config/config";

export const userCreationSchema = z.object({
    email: z.string().email(),
    username: z.string().min(6),
    password: z.string().min(minimum_password_length),
})

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(minimum_password_length),
})

export const userUpdateSchema = z.object({
    email: z.string().email(),
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    avatar: z.string().url().optional(),
    bio: z.string().min(10),
    phone: z.string().min(10),
    password: z.string().min(minimum_password_length),
});