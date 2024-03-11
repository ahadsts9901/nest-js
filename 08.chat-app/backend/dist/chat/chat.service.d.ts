import { CreateChatDto } from 'src/dto/chat/create-chat.dto';
import { RequestWithUser } from 'src/middlewares/auth.middleware';
export declare class ChatService {
    findAll(userId: string, req: RequestWithUser): Promise<{
        message: string;
        data: any;
    }>;
    create(createPostDto: CreateChatDto, req: RequestWithUser): Promise<{
        message: string;
    }>;
}
