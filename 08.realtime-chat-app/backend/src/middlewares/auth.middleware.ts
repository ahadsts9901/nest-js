import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import "dotenv/config"

@Injectable()

export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService) { }

    async use(req: RequestWithUser, res: Response, next: NextFunction) {

        const token = req.cookies['hart'];

        if (!token) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        try {

            const decoded = this.jwtService.verify(token);

            req.currentUser = decoded;
            next();

        } catch (error) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
    }
}

export interface RequestWithUser extends Request {
    currentUser?: any;
}