import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { LoginUserDto } from 'src/dto/users/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Req() req, @Res() res, @Body() createUserDto: CreateUserDto) {
        return this.authService.signup(req, res, createUserDto)
    }

}