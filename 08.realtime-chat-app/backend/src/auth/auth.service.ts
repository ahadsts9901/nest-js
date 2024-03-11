import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { SignupUserDto } from 'src/dto/auth/signup-user.dto';
import { emailPattern, userModel } from 'src/schema';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }

    async signup(req: Request, res: Response, signupUserDto: SignupUserDto) {

        const { firstName, lastName, email, password } = signupUserDto

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

        if (!isMatch) {
            throw new BadRequestException('email or password incorrect')
        }

        const hart = await this.jwtService.signAsync({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id
        })

        res.cookie('hart', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 86400000) // 24 hours expiry
        });

        return res.send({
            message: "login successful",
        })

    }

    async logout(req: Request, res: Response) {

        res.clearCookie("hart")

        return res.send({
            message: "logout successfull"
        })

    }

    async getUsers() {
        const resp = await userModel.find().sort({ _id: -1 }).exec()
        return {
            message: "user fetched",
            data: resp
        }
    }

    async getUser(userId: string) {

        if (!userId || userId.trim() === "") {
            throw new BadRequestException('userId not provided')
        }

        if (!isValidObjectId(userId)) {
            throw new BadRequestException('invalid userId')
        }

        const res = await userModel.findById(userId).exec()

        return {
            message: "account fetched",
            data: {
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                createdOn: res.createdOn,
                _id: res._id
            }
        }

    }

}