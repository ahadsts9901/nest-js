import { CreateChatDto } from 'src/dto/chat/create-chat.dto';
import { ChatService } from './chat.service';
import { RequestWithUser } from 'src/middlewares/auth.middleware';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    findAll(userId: string, req: RequestWithUser): Promise<{
        message: string;
        data: any;
    }>;
    create(createChatDto: CreateChatDto, req: RequestWithUser): Promise<{
        message: string;
    }>;
}
