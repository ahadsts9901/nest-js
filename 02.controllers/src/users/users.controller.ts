import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get() // GET /users?role=admin
    findAll(@Query('role') role?: string) {
        return [{ role }]
    }

    @Post() // POST /users
    create(@Body() user: {}) {
        return { user }
    }

    @Get(':userId') // GET /users/:userId
    findOne(@Param('userId') userId: string) {
        return { userId }
    }

    @Put(':userId') // PUT /users/:userId
    updateOne(@Param('userId') userId: string, @Body() updatedData: {}) {
        return { userId, updatedData }
    }

    @Delete(':userId') // DELETE /users/userId
    deleteOne(@Param('userId') userId: string) {
        return { userId }
    }
}
