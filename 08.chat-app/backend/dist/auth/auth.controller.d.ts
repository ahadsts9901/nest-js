/// <reference types="cookie-parser" />
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignupUserDto } from 'src/dto/auth/signup-user.dto';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    users(): Promise<{
        message: string;
        data: any;
    }>;
    signup(req: Request, res: Response, signupUserDto: SignupUserDto): Promise<Response<any, Record<string, any>>>;
    loign(req: Request, res: Response, loginUserDto: LoginUserDto): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
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
