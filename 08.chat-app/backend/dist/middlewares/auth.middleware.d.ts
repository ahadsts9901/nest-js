/// <reference types="cookie-parser" />
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import "dotenv/config";
export declare class AuthMiddleware implements NestMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: RequestWithUser, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
export interface RequestWithUser extends Request {
    currentUser?: any;
}
