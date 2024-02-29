import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    findAll(@Query('role') role?: string) {
        return this.userService.findAll(role)
    }

    @Post()
    create(@Body() userData: { name: string, email: string, role: string }) {
        return this.userService.create(userData)
    }

    @Get(':userId')
    findOne(@Param('userId') userId: string) {
        return this.userService.findOne(+userId)
    }

    @Delete(':userId')
    deleteOne(@Param('userId') userId: string) {
        return this.userService.deleteOne(+userId)
    }

    @Put(':userId')
    updateOne(
        @Param('userId') userId: string,
        @Body() updatedData: { name?: string, email?: string, role?: string }
    ) {
        return this.userService.updateOne(+userId, updatedData)
    }

}
