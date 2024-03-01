import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('posts')
export class PostsController {

    @Get()
    findAll() {
        return []
    }

    @Post()
    create(@Body() post: {}) {
        return { ...post }
    }

    @Delete(':postId')
    deleteOne(@Param('postId') postId: string) {
        return postId
    }

    @Put(':postId')
    updateOne(@Param('postId') postId: string, @Body() updatedPost: {}) {
        return postId
    }

}
