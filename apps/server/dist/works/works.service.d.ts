interface Work {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    author: string;
    authorId: number;
    price?: number;
    views: number;
    likes: number;
    tags: string[];
    steps: {
        description: string;
    }[];
    enableMatching: boolean;
    createdAt: string;
}
export declare class WorksService {
    private works;
    findAll(filters: {
        difficulty?: string;
        preferenceMatch?: boolean;
    }): {
        total: number;
        items: Work[];
    };
    findOne(id: number): Work;
    create(createWorkDto: any): Work;
    contactAuthor(id: number, contactDto: any): {
        success: boolean;
        message: string;
        authorId?: undefined;
        authorName?: undefined;
    } | {
        success: boolean;
        message: string;
        authorId: number;
        authorName: string;
    };
}
export {};
