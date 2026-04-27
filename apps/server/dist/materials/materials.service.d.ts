export interface Material {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    unit: string;
    hasTrialPack: boolean;
    trialPrice?: number;
    categories: string[];
    techniques: string[];
    jewelryTypes: string[];
    specs: string;
}
export declare class MaterialsService {
    private materials;
    private categories;
    private techniques;
    findAll(filters: {
        jewelryType?: string;
        category?: string;
        technique?: string;
        hasTrialPack?: boolean;
    }): {
        total: number;
        items: Material[];
    };
    findOne(id: number): Material;
    getCategories(): {
        label: string;
        value: string;
    }[];
    getTechniques(): {
        label: string;
        value: string;
    }[];
}
