/// <reference types="cookie-parser" />
import { SignupUserDto } from 'src/dto/auth/signup-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    signup(req: Request, res: Response, signupUserDto: SignupUserDto): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response, loginUserDto: LoginUserDto): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUsers(): Promise<{
        message: string;
        data: any;
    }>;
    getUser(userId: string): Promise<{
        message: string;
        data: {
            firstName: any;
            lastName: any;
            email: any;
            createdOn: any;
            _id: any;
        };
    }>;
}
