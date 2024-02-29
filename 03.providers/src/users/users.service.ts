import { Injectable } from '@nestjs/common';

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
            return this.users.filter((user) => {
                return user.role === role
            })
        }

        return this.users

    }

    findOne(userId: number) {

        return this.users.find((user) => {
            return user.id === userId
        })

    }

    create(user: { name: string, role: string, email: string }) {

        const newUser = {
            id: this.users.length + 1,
            ...user
        }

        console.log(newUser);
        

        this.users.push(newUser)

        return newUser

    }

    updateOne(userId: number, updatedData: { name?: string, role?: string, email?: string }) {

        this.users.map((user) => {
            if (user.id === userId) {
                return { user, updatedData }
            }
            return user
        })

        return this.findOne(userId)

    }

    deleteOne(userId: number) {

        const removedUser = this.findOne(userId)

        this.users.filter((user) => {
            user.id !== userId
        })

        return removedUser

    }

}
