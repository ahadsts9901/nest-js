import { Controller, Get, Req, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Response } from 'express';
import { RequestWithUser } from 'src/middlewares/auth.middleware';

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Get()
    profile(@Req() req: RequestWithUser, @Res() res: Response) {
        return this.profileService.profile(req, res)
    }

}