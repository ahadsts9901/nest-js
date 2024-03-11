import { ProfileService } from './profile.service';
import { Response } from 'express';
import { RequestWithUser } from 'src/middlewares/auth.middleware';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    profile(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
