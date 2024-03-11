import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestWithUser } from 'src/middlewares/auth.middleware';
import { userModel } from 'src/schema';

@Injectable()
export class ProfileService {

    async profile(req: RequestWithUser, res: Response) {

        const { email } = req?.currentUser

        if (!email || email.trim() === "") {
            throw new BadRequestException('email not provided')
        }

        const resp = await userModel.findOne({ email: email }).exec()

        if (!resp) {
            throw new NotFoundException('account not found')
        }

        return res.send({
            message: "account fetched",
            data: {
                firstName: resp.firstName,
                lastName: resp.lastName,
                email: resp.email,
                createdOn: resp.createdOn,
                _id: resp._id
            }
        })

    }

}