import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    findAll(@Query('role') role?: string) {
        return this.userService.findAll(role)
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
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
        @Body(ValidationPipe) updateUserDto: UpdateUserDTO
    ) {
        return this.userService.updateOne(+userId, updateUserDto)
    }

}