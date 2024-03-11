import { BadRequestException, Injectable, } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { CreateChatDto } from 'src/dto/chat/create-chat.dto';
import { RequestWithUser } from 'src/middlewares/auth.middleware';
import { chatModel } from 'src/schema';
import { pusherServer } from 'src/pusher';
import { toPusherKey } from 'src/pusher';

@Injectable()
export class ChatService {

    async findAll(userId: string, req: RequestWithUser) {

        const from_id = req?.currentUser?._id
        const to_id = userId

        if (!to_id || to_id.trim() === "") {
            throw new BadRequestException('invalid to_id')
        }

        if (!isValidObjectId(to_id)) {
            throw new BadRequestException('invalid to_id')
        }

        const resp = await chatModel.find({
            $or: [
                {
                    to_id: to_id,
                    from_id: from_id,
                },
                {
                    from_id: to_id,
                    to_id: from_id
                }
            ]
        }).sort({ _id: -1 }).exec()

        return {
            message: "messages fetched",
            data: resp
        }

    }

    async create(createPostDto: CreateChatDto, req: RequestWithUser) {

        const from_id = req?.currentUser?._id
        const to_id = createPostDto?.to_id
        const message = createPostDto?.message

        if (!message || message.trim() === "") {
            throw new BadRequestException('message is required')
        }

        if (!to_id || to_id.trim() === "") {
            throw new BadRequestException('to_id is required')
        }

        if (!isValidObjectId(to_id)) {
            throw new BadRequestException('invalid to_id')
        }

        const res = await chatModel.create({
            from_id: from_id,
            to_id: to_id,
            message: message
        })

        try {
            pusherServer.trigger(
                toPusherKey(`user:${to_id}:message`), `message`,
                {
                    senderId: from_id
                }
            )

        } catch (error) {
            console.log(error);

        }

        return {
            message: "message sent"
        }

    }

}