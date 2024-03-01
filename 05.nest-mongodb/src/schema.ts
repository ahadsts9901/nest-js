import mongoose, { Schema } from "mongoose";

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