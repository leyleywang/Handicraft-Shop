import { TutorialsService } from './tutorials.service';
export declare class TutorialsController {
    private readonly tutorialsService;
    constructor(tutorialsService: TutorialsService);
    findAll(type?: 'video' | 'article', difficulty?: string): {
        total: number;
        items: import("./tutorials.service").Tutorial[];
    };
    findOne(id: string): import("./tutorials.service").Tutorial;
}
