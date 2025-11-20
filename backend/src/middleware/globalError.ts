import type { ErrorRequestHandler, Request, Response,NextFunction } from "express";
import { AppError } from "../utils/appError.js";

export const globalError:ErrorRequestHandler = (error:any, req:Request, res:Response, next:NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message || "Internal Server Error",
        });
    }
}