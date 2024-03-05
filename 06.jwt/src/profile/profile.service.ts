import { Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/middleware';
import { Response } from "express"

@Injectable()
export class ProfileService {

    async profile(req: RequestWithUser, res: Response) {
        return res.send(req.currentUser)
    }

}