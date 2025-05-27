export class HTTPResponse {
    private res: any;

    constructor(res: any) {
        this.res = res;
    }

    send(statusCode: number, message?: string, data?: any) {
        const isSuccess = statusCode < 400;

        return this.res.status(statusCode).json({
            success: isSuccess,
            message: message,
            ...(data !== undefined && { data }),
        });
    }

    success(data?: any, message?: string) {
        return this.send(200, message, data);
    }

    created(data?: any, message?: string) {
        return this.send(201, message, data);
    }

    error(statusCode = 500, message?: string, data?: any) {
        return this.send(statusCode, message, data);
    }

    notFound(message?: string) {
        return this.send(404, message);
    }

    unauthorized(message?: string) {
        return this.send(401, message);
    }

    badRequest(message?: string) {
        return this.send(400, message);
    }

    // Add more methods if needed (for 400, 403, 409, etc.)
}
