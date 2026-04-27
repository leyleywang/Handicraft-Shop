import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(id: string): import("./users.service").User;
    getProfile(id: string): {
        id: number;
        username: string;
        avatar?: string;
        bio: string;
        email: string;
        phone?: string;
        createdAt: string;
    };
    getStats(id: string): import("./users.service").UserStats;
}
