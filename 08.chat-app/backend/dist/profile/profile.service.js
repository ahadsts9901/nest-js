"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const schema_1 = require("../schema");
let ProfileService = class ProfileService {
    async profile(req, res) {
        const { email } = req?.currentUser;
        if (!email || email.trim() === "") {
            throw new common_1.BadRequestException('email not provided');
        }
        const resp = await schema_1.userModel.findOne({ email: email }).exec();
        if (!resp) {
            throw new common_1.NotFoundException('account not found');
        }
        return res.send({
            message: "account fetched",
            data: {
                firstName: resp.firstName,
                lastName: resp.lastName,
                email: resp.email,
                createdOn: resp.createdOn,
                _id: resp._id
            }
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)()
], ProfileService);
//# sourceMappingURL=profile.service.js.map