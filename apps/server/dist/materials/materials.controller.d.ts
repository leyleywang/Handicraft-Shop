import { MaterialsService } from './materials.service';
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    findAll(jewelryType?: string, category?: string, technique?: string, hasTrialPack?: boolean): {
        total: number;
        items: import("./materials.service").Material[];
    };
    findOne(id: string): import("./materials.service").Material;
    getCategories(): {
        label: string;
        value: string;
    }[];
    getTechniques(): {
        label: string;
        value: string;
    }[];
}
