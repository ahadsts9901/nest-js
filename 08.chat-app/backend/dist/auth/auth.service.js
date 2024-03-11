"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const schema_1 = require("../schema");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("mongoose");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async signup(req, res, signupUserDto) {
        const { firstName, lastName, email, password } = signupUserDto;
        if (!firstName || firstName.trim() === "") {
            throw new common_1.BadRequestException('firstName is required');
        }
        if (!lastName || lastName.trim() === "") {
            throw new common_1.BadRequestException('lastName is required');
        }
        if (!email || email.trim() === "") {
            throw new common_1.BadRequestException('email is required');
        }
        if (!schema_1.emailPattern.test(email)) {
            throw new common_1.BadGatewayException('invalid email');
        }
        if (!password || password.trim() === "") {
            throw new common_1.BadRequestException('password is required');
        }
        const isUserExists = await schema_1.userModel.findOne({ email: email }).exec();
        if (isUserExists) {
            throw new common_1.BadRequestException('email already taken');
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const resp = await schema_1.userModel.create({
            firstName, lastName, email, password: passwordHash
        });
        const _id = resp?._id;
        const hart = await this.jwtService.signAsync({
            firstName, lastName, email, _id
        });
        res.cookie('hart', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 86400000)
        });
        return res.send({
            message: "signup successful",
        });
    }
    async login(req, res, loginUserDto) {
        const { email, password } = loginUserDto;
        if (!email || email.trim() === "") {
            throw new common_1.BadRequestException('email is required');
        }
        if (!schema_1.emailPattern.test(email)) {
            throw new common_1.BadGatewayException('invalid email');
        }
        if (!password || password.trim() === "") {
            throw new common_1.BadRequestException('password is required');
        }
        const user = await schema_1.userModel.findOne({ email: email }).exec();
        if (!user) {
            throw new common_1.BadRequestException('email or password incorrect');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('email or password incorrect');
        }
        const hart = await this.jwtService.signAsync({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id
        });
        res.cookie('hart', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 86400000)
        });
        return res.send({
            message: "login successful",
        });
    }
    async logout(req, res) {
        res.clearCookie("hart");
        return res.send({
            message: "logout successfull"
        });
    }
    async getUsers() {
        const resp = await schema_1.userModel.find().sort({ _id: -1 }).exec();
        return {
            message: "user fetched",
            data: resp
        };
    }
    async getUser(userId) {
        if (!userId || userId.trim() === "") {
            throw new common_1.BadRequestException('userId not provided');
        }
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            throw new common_1.BadRequestException('invalid userId');
        }
        const res = await schema_1.userModel.findById(userId).exec();
        return {
            message: "account fetched",
            data: {
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                createdOn: res.createdOn,
                _id: res._id
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map