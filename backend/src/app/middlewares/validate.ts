import { ZodSchema } from "zod";
import { HTTPResponse } from "../utils/HTTPResponseHandler";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const response = new HTTPResponse(res)
    const result = schema.safeParse(req.body);

    if (!result.success) {
        response.badRequest("Validation failed", result.error.format())
    } else {
        req.body = result.data;
        next();
    }
};