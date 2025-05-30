import { z } from "zod";

export const userCreationSchema = z.object({
    email: z.string().email(),
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    password: z.string().min(6),
    avatar: z.string().url().optional(),
    bio: z.string().min(10),
    phone: z.string().min(10),
})

export const userUpdateSchema = z.object({
    email: z.string().email(),
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    avatar: z.string().url().optional(),
    bio: z.string().min(10),
    phone: z.string().min(10),
    password: z.string().min(6),
});