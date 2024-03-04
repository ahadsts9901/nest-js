import { Controller, Get, Req, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RequestWithUser } from 'src/middleware';
import { Response } from 'express';

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Get()
    profile(@Req() req: RequestWithUser, @Res() res: Response) {
        return this.profileService.profile(req, res)
    }

}