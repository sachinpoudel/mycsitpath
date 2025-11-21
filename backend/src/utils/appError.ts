import { INVALID } from "zod/v3";

export const httpConfigCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    INVALID_INPUT: 422,
}

export class AppError extends Error {
    statusCode: number;
    constructor(message:string="Internal Server Error", statusCode=httpConfigCode.INTERNAL_SERVER_ERROR) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class badRequest extends AppError {
    constructor(message:string = "Bad Request") {
        super(message, httpConfigCode.BAD_REQUEST);
    }
}
export class unAuthorized extends AppError {
    constructor(message:string = "Unauthorized") {
        super(message, httpConfigCode.UNAUTHORIZED);
    }
}
export class invalidCredentials extends AppError {
    constructor(message:string = "Invalid Credentials") {
        super(message, httpConfigCode.INVALID_INPUT);
    }
}