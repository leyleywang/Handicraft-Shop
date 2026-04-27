export interface UserStats {
    worksCount: number;
    collectionsCount: number;
    followersCount: number;
    followingCount: number;
}
export interface User {
    id: number;
    username: string;
    avatar?: string;
    bio: string;
    email: string;
    phone?: string;
    createdAt: string;
    stats: UserStats;
}
export declare class UsersService {
    private users;
    findOne(id: number): User;
    getProfile(id: number): {
        id: number;
        username: string;
        avatar?: string;
        bio: string;
        email: string;
        phone?: string;
        createdAt: string;
    };
    getStats(id: number): UserStats;
}
