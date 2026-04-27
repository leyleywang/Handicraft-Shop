import { WorksService } from './works.service';
export declare class WorksController {
    private readonly worksService;
    constructor(worksService: WorksService);
    findAll(difficulty?: string, preferenceMatch?: boolean): {
        total: number;
        items: import("./works.service").Work[];
    };
    findOne(id: string): import("./works.service").Work;
    create(createWorkDto: any): import("./works.service").Work;
    contactAuthor(id: string, contactDto: any): {
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
