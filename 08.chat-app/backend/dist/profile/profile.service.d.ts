import { Response } from 'express';
import { RequestWithUser } from 'src/middlewares/auth.middleware';
export declare class ProfileService {
    profile(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
