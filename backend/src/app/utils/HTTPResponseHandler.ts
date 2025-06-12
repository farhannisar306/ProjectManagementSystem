import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "./status-codes/HTTPStatuses";

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
        return this.send(OK, message, data);
    }

    created(data?: any, message?: string) {
        return this.send(CREATED, message, data);
    }

    error(statusCode?: number, message?: string, data?: any) {
        return this.send(statusCode || INTERNAL_SERVER_ERROR, message, data);
    }

    notFound(message?: string, data?: any) {
        return this.send(NOT_FOUND, message, data);
    }

    unauthorized(message?: string) {
        return this.send(UNAUTHORIZED, message);
    }

    badRequest(message?: string, data?: any) {
        return this.send(BAD_REQUEST, message, data);
    }

    internalServerError(message?: string, data?: any) {
        return this.send(INTERNAL_SERVER_ERROR, message || 'Internal Server Error', data);
    }
}
