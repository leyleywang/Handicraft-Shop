interface Tutorial {
    id: number;
    title: string;
    description: string;
    cover: string;
    type: 'video' | 'article';
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    duration: string;
    views: number;
    content?: string;
}
export declare class TutorialsService {
    private tutorials;
    findAll(filters: {
        type?: 'video' | 'article';
        difficulty?: string;
    }): {
        total: number;
        items: Tutorial[];
    };
    findOne(id: number): Tutorial;
}
export {};
