"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const schema_1 = require("../schema");
const pusher_1 = require("../pusher");
const pusher_2 = require("../pusher");
let ChatService = class ChatService {
    async findAll(userId, req) {
        const from_id = req?.currentUser?._id;
        const to_id = userId;
        if (!to_id || to_id.trim() === "") {
            throw new common_1.BadRequestException('invalid to_id');
        }
        if (!(0, mongoose_1.isValidObjectId)(to_id)) {
            throw new common_1.BadRequestException('invalid to_id');
        }
        const resp = await schema_1.chatModel.find({
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
        }).sort({ _id: -1 }).exec();
        return {
            message: "messages fetched",
            data: resp
        };
    }
    async create(createPostDto, req) {
        const from_id = req?.currentUser?._id;
        const to_id = createPostDto?.to_id;
        const message = createPostDto?.message;
        if (!message || message.trim() === "") {
            throw new common_1.BadRequestException('message is required');
        }
        if (!to_id || to_id.trim() === "") {
            throw new common_1.BadRequestException('to_id is required');
        }
        if (!(0, mongoose_1.isValidObjectId)(to_id)) {
            throw new common_1.BadRequestException('invalid to_id');
        }
        const res = await schema_1.chatModel.create({
            from_id: from_id,
            to_id: to_id,
            message: message
        });
        try {
            pusher_1.pusherServer.trigger((0, pusher_2.toPusherKey)(`user:${to_id}:message`), `message`, {
                senderId: from_id
            });
        }
        catch (error) {
            console.log(error);
        }
        return {
            message: "message sent"
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)()
], ChatService);
//# sourceMappingURL=chat.service.js.map