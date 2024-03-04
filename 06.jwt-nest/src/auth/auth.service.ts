import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { emailPattern, userModel } from 'src/schema';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

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

        const jwtToken = await this.jwtService.signAsync({
            firstName, lastName, email, _id
        })

        res.cookie('accessToken', jwtToken);

        return res.send({
            message: "signup successful",
            access_token: jwtToken
        })

    }

}