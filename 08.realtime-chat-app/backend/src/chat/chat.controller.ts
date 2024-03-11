import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateChatDto } from 'src/dto/chat/create-chat.dto';
import { ChatService } from './chat.service';
import { RequestWithUser } from 'src/middlewares/auth.middleware';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get(':userId')
    findAll(@Param('userId') userId: string, @Req() req: RequestWithUser) {
        return this.chatService.findAll(userId, req)
    }

    @Post()
    create(@Body() createChatDto: CreateChatDto, @Req() req: RequestWithUser) {
        return this.chatService.create(createChatDto, req)
    }

}