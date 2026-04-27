"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [
            {
                id: 1,
                username: '手作达人',
                bio: '热爱手工饰品制作，分享创意与灵感',
                email: 'user@example.com',
                phone: '138****8888',
                createdAt: '2025-01-15',
                stats: {
                    worksCount: 12,
                    collectionsCount: 25,
                    followersCount: 156,
                    followingCount: 32
                }
            }
        ];
    }
    findOne(id) {
        return this.users.find(u => u.id === id);
    }
    getProfile(id) {
        const user = this.findOne(id);
        if (!user)
            return null;
        const { stats, ...profile } = user;
        return profile;
    }
    getStats(id) {
        const user = this.findOne(id);
        if (!user)
            return null;
        return user.stats;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map