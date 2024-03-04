import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { emailPattern, userModel } from 'src/schema';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginUserDto } from 'src/dto/users/login-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }

    async signup(req: Request, res: Response, createUserDto: CreateUserDto) {

        const { firstName, lastName, email, password } = createUserDto

        if (!firstName || firstName.trim() === "") {
            throw new BadRequestException('firstName is required')
        }

        if (!lastName || lastName.trim() === "") {
            throw new BadRequestException('lastName is required')
        }

        if (!email || email.trim() === "") {
            throw new BadRequestException('email is required')
        }

        if (!emailPattern.test(email)) {
            throw new BadGatewayException('invalid email')
        }

        if (!password || password.trim() === "") {
            throw new BadRequestException('password is required')
        }

        const isUserExists = await userModel.findOne({ email: email }).exec()

        if (isUserExists) {
            throw new BadRequestException('email already taken')
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const resp = await userModel.create({
            firstName, lastName, email, password: passwordHash
        })

        const _id = resp?._id

        const hart = await this.jwtService.signAsync({
            firstName, lastName, email, _id
        })

        res.cookie('hart', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 86400000) // 24 hours expiry
        });

        return res.send({
            message: "signup successful",
        })

    }

    async login(req: Request, res: Response, loginUserDto: LoginUserDto) {

        const { email, password } = loginUserDto

        if (!email || email.trim() === "") {
            throw new BadRequestException('email is required')
        }

        if (!emailPattern.test(email)) {
            throw new BadGatewayException('invalid email')
        }

        if (!password || password.trim() === "") {
            throw new BadRequestException('password is required')
        }

        const user = await userModel.findOne({ email: email }).exec()

        if (!user) {
            throw new BadRequestException('email or password incorrect')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            throw new BadRequestException('email or password incorrect')
        }

        const hart = await this.jwtService.signAsync({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id
        })

        res.cookie('hatr', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 86400000) // 24 hours expiry
        });

        return res.send({
            message: "login successful",
        })

    }

}