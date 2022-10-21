import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return next();
    }

    try {

        req.currentUser = jwt.verify(validateAuthHeader(authHeader), process.env.JWT_KEY!) as UserPayload;
    } catch (err) {}

    next();
}

const validateAuthHeader = (authHeader: string): string => {
    const parts = authHeader.split(" ");
    if (parts.length > 2 || parts[0] !== 'Bearer') {
        throw new Error('Malformed Jwt');
    }

    return parts[1];
}
