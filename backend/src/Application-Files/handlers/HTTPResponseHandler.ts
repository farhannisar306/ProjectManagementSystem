export class HTTPResponse {
    private res: any;

    constructor(res: any) {
        this.res = res;
    }

    private getDefaultMessage(statusCode: number): string {
        const messages: Record<number, string> = {
            200: 'OK',
            201: 'Created',
            204: 'No Content',
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            409: 'Conflict',
            422: 'Unprocessable Entity',
            429: 'Too Many Requests',
            500: 'Internal Server Error',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
        };
        return messages[statusCode] || 'Unknown status';
    }

    send(statusCode: number, message?: string, data?: any) {
        return this.res.status(statusCode).json({
            success: statusCode < 400,
            message: message || this.getDefaultMessage(statusCode),
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

    internalServerError(message?: string) {
        return this.send(500, message);
    }

    // Add more methods if needed (for 400, 403, 409, etc.)
}
