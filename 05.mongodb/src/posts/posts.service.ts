import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { UpdatePostDto } from 'src/dto/update-post.dto';
import { postModel } from 'src/schema';

@Injectable()
export class PostsService {

    async create(createPostDto: CreatePostDto) {

        const { title, text } = createPostDto

        if (!title || !text || title.trim() === "" || text.trim() === "") {
            throw new BadRequestException('title or text missing')
        }

        const res = await postModel.create({
            title: title,
            text: text
        })

        return {
            message: "post created"
        }

    }

    async findAll() {

        const resp = await postModel.find().sort({ _id: -1 }).exec()
        return resp

    }

    async deleteOne(postId: string) {

        if (!postId || postId.trim() === "") {
            throw new BadRequestException('postId not provided')
        }

        if (!isValidObjectId(postId)) {
            throw new BadRequestException('invalid postId')
        }

        const resp = await postModel.findByIdAndDelete(postId)

        if (!resp) {
            throw new NotFoundException('post not found')
        }

        return {
            message: "post deleted"
        }


    }

    async updateOne(postId: string, updatePostDto: UpdatePostDto) {

        const { title, text } = updatePostDto

        if (!title || !text || title.trim() === "" || text.trim() === "") {
            throw new BadRequestException('title or text missing')
        }

        if (!postId || postId.trim() === "") {
            throw new BadRequestException('postId not provided')
        }

        if (!isValidObjectId(postId)) {
            throw new BadRequestException('invalid postId')
        }

        const resp = await postModel.findByIdAndUpdate({
            _id: postId
        },
            {
                $set: {
                    title: title,
                    text: text
                }
            }, { new: true, runValidators: true })

        if (!resp) {
            throw new NotFoundException('post not found')
        }

        return {
            message: "post updated"
        }

    }

}
