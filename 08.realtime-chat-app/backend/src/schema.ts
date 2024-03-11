import { match } from "assert";
import mongoose, { Schema } from "mongoose";
export const emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// chat schema
const chatSchema = new Schema({
    message: {
        type: String,
        required: [true, 'message is required'],
        minlength: 2,
        trim: true,
    },
    from_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'from id is required']
    },
    to_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'to id is required']
    },
    time: {
        type: Date,
        default: Date.now
    }
})

let chatModel: any;

try {
    chatModel = mongoose.model('chats');
} catch (error) {
    chatModel = mongoose.model('chats', chatSchema);
}

export { chatModel }

// user schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
        minlength: 2,
        maxlength: 15,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
        minlength: 2,
        maxlength: 15,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        match: emailPattern
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});

let userModel: any;

try {
    userModel = mongoose.model('users');
} catch (error) {
    userModel = mongoose.model('users', userSchema);
}

export { userModel }