import { match } from "assert";
import mongoose, { Schema } from "mongoose";
export const emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// post schema
const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minlength: 2,
        maxlength: 20,
        trim: true,
    },
    text: {
        type: String,
        required: [true, 'text is required'],
        minlength: 2,
        maxlength: 1200,
        trim: true,
    },
    time: {
        type: Date,
        default: Date.now
    }
})

let postModel: any;

try {
    postModel = mongoose.model('posts');
} catch (error) {
    postModel = mongoose.model('posts', postSchema);
}

export { postModel }

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