import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { UpdatePostDto } from 'src/dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll() {
        return this.postsService.findAll()
    }

    @Post()
    create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto)
    }

    @Delete(':postId')
    deleteOne(@Param('postId') postId: string) {
        return this.postsService.deleteOne(postId)
    }

    @Put(':postId')
    updateOne(@Param('postId') postId: string, @Body(ValidationPipe) updatePostDto: UpdatePostDto) {
        return this.postsService.updateOne(postId, updatePostDto)
    }

}
