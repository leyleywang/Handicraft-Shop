import { MarketplaceService } from './marketplace.service';
export declare class MarketplaceController {
    private readonly marketplaceService;
    constructor(marketplaceService: MarketplaceService);
    getIdleItems(userId?: string, category?: string): {
        total: number;
        items: import("./marketplace.service").IdleItem[];
    };
    getMaterialRequests(userId?: string, status?: string): {
        total: number;
        items: import("./marketplace.service").MaterialRequest[];
    };
    getIdleItem(id: string): import("./marketplace.service").IdleItem;
    getMaterialRequest(id: string): import("./marketplace.service").MaterialRequest;
    publishIdleItem(publishDto: any): import("./marketplace.service").IdleItem;
    publishMaterialRequest(publishDto: any): import("./marketplace.service").MaterialRequest;
}
