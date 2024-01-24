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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./friends.service");
const jwt_1 = require("@nestjs/jwt");
const dto_1 = require("./dto");
let FriendsController = class FriendsController {
    constructor(friendsService, jwtService) {
        this.friendsService = friendsService;
        this.jwtService = jwtService;
    }
    createFriendRequest(req, dto) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);
        const { receiverUserId } = dto;
        return this.friendsService.createFriendRequest(userId, receiverUserId);
    }
    acceptFriendRequest(req, dto) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);
        const { requestId } = dto;
        return this.friendsService.acceptFriendRequest(userId, requestId);
    }
    getFriendsData(req) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);
        return this.friendsService.getFriendsData(userId);
    }
};
__decorate([
    (0, common_1.Post)('/request'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateFriendRequestDto]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "createFriendRequest", null);
__decorate([
    (0, common_1.Post)('/accept'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AcceptFriendRequestDto]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "getFriendsData", null);
FriendsController = __decorate([
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [friends_service_1.FriendsService, jwt_1.JwtService])
], FriendsController);
exports.FriendsController = FriendsController;
//# sourceMappingURL=friends.controller.js.map