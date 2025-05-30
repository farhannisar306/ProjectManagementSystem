import { ZodSchema } from "zod";
import { HTTPResponse } from "../utils/HTTPResponseHandler";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const response = new HTTPResponse(res)
    const result = schema.safeParse(req.body);

    if (!result.success) {
        response.badRequest("Validation failed", result.error.format())
    }

    // Optional: attach validated data to req
    req.body = result.data;
    next();
};
// const userSchema = z.object({
//     username: z.string().min(3),
//     email: z.string().email(),
//     age: z.number().int().gte(18),
// });

// app.post("/api/validate", validate(userSchema), (req, res) => {
//     // req.body is now typed and validated!
//     res.status(200).json({
//         message: "Validation successful",
//         data: req.body,
//     });
// });