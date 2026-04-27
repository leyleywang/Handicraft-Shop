import { Injectable } from '@nestjs/common';

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

@Injectable()
export class UsersService {
  private users: User[] = [
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

  findOne(id: number) {
    return this.users.find(u => u.id === id);
  }

  getProfile(id: number) {
    const user = this.findOne(id);
    if (!user) return null;
    const { stats, ...profile } = user;
    return profile;
  }

  getStats(id: number) {
    const user = this.findOne(id);
    if (!user) return null;
    return user.stats;
  }
}
