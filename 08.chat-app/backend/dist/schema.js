"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.chatModel = exports.emailPattern = void 0;
const mongoose_1 = require("mongoose");
exports.emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const chatSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: [true, 'message is required'],
        minlength: 2,
        trim: true,
    },
    from_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'from id is required']
    },
    to_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'to id is required']
    },
    time: {
        type: Date,
        default: Date.now
    }
});
let chatModel;
try {
    exports.chatModel = chatModel = mongoose_1.default.model('chats');
}
catch (error) {
    exports.chatModel = chatModel = mongoose_1.default.model('chats', chatSchema);
}
const userSchema = new mongoose_1.Schema({
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
        match: exports.emailPattern
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
});
userSchema.pre('save', function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});
let userModel;
try {
    exports.userModel = userModel = mongoose_1.default.model('users');
}
catch (error) {
    exports.userModel = userModel = mongoose_1.default.model('users', userSchema);
}
//# sourceMappingURL=schema.js.map