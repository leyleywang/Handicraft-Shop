export interface IdleItem {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    owner: string;
    ownerId: number;
    tags: string[];
    status: 'available' | 'sold' | 'reserved';
    views: number;
    createdAt: string;
}
export interface MaterialRequest {
    id: number;
    title: string;
    description: string;
    quantity: string;
    budget: string;
    deadline: string;
    requester: string;
    requesterId: number;
    status: 'active' | 'fulfilled' | 'expired';
    createdAt: string;
}
export declare class MarketplaceService {
    private idleItems;
    private materialRequests;
    getIdleItems(filters: {
        userId?: number;
        category?: string;
    }): {
        total: number;
        items: IdleItem[];
    };
    getMaterialRequests(filters: {
        userId?: number;
        status?: string;
    }): {
        total: number;
        items: MaterialRequest[];
    };
    getIdleItem(id: number): IdleItem;
    getMaterialRequest(id: number): MaterialRequest;
    publishIdleItem(publishDto: any): IdleItem;
    publishMaterialRequest(publishDto: any): MaterialRequest;
}
