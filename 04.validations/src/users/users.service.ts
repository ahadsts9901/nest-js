import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "user1",
            role: "admin",
            email: "user1@gmail.com"
        },
        {
            id: 2,
            name: "user2",
            role: "user",
            email: "user2@gmail.com"
        },
        {
            id: 3,
            name: "user3",
            role: "user",
            email: "user3@gmail.com"
        },
        {
            id: 4,
            name: "user4",
            role: "admin",
            email: "user4@gmail.com"
        },
        {
            id: 5,
            name: "user5",
            role: "user",
            email: "user5@gmail.com"
        },
    ]

    findAll(role: string) {

        if (role) {

            const users = this.users.filter((user) => {
                return user.role === role
            })

            if (users.length < 1) {
                throw new NotFoundException('no user found')
            }

            return users

        }

        return this.users

    }

    findOne(userId: number) {

        const user = this.users.find((user) => {
            user.id === userId
        })

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return user

    }

    create(createUserDto: CreateUserDto) {

        const newUser = {
            id: this.users.length + 1,
            ...createUserDto
        }

        console.log(newUser);


        this.users.push(newUser)

        return newUser

    }

    updateOne(userId: number, updateUserDto: UpdateUserDTO) {

        this.users.map((user) => {
            if (user.id == userId) {
                return { user, updateUserDto }
            }
            return user
        })

        return this.findOne(userId)

    }

    deleteOne(userId: number) {

        const removedUser = this.findOne(userId)

        this.users.filter((user) => {
            user.id != userId
        })

        return removedUser

    }

}
