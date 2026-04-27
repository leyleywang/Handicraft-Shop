"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceService = void 0;
const common_1 = require("@nestjs/common");
let MarketplaceService = class MarketplaceService {
    constructor() {
        this.idleItems = [
            {
                id: 1,
                title: '古法银月光石手链',
                description: '手工编织，采用天然月光石与古法银配件，每颗月光石都有独特的蓝光效应',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20handmade%20bracelet%20with%20moonstone%20and%20silver%20components%20on%20white%20background&image_size=square',
                price: 299,
                owner: '手作达人小芳',
                ownerId: 1,
                tags: ['手链', '月光石', '古法银'],
                status: 'available',
                views: 1256,
                createdAt: '2026-04-20'
            },
            {
                id: 2,
                title: '天然石串珠耳环',
                description: '选用紫水晶、粉晶等天然石，纯手工串制，适合日常佩戴',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20earrings%20with%20natural%20amethyst%20and%20rose%20quartz%20beads%20on%20white%20background&image_size=square',
                price: 158,
                owner: '晶石匠人',
                ownerId: 2,
                tags: ['耳饰', '天然石', '手工串珠'],
                status: 'available',
                views: 892,
                createdAt: '2026-04-18'
            },
            {
                id: 3,
                title: '绕线艺术水晶吊坠',
                description: '采用铜线绕线工艺，包裹纯净白水晶，可搭配各种项链',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wire%20wrapped%20crystal%20pendant%20handmade%20jewelry%20copper%20wire%20clear%20quartz%20on%20white%20background&image_size=square',
                price: 199,
                owner: '绕线艺术家',
                ownerId: 3,
                tags: ['项链', '绕线', '水晶'],
                status: 'available',
                views: 1567,
                createdAt: '2026-04-15'
            }
        ];
        this.materialRequests = [
            {
                id: 1,
                title: '求购天然石碎石混装',
                description: '需要500g天然石碎石，用于手链和耳饰制作，要求颜色丰富，尺寸在3-8mm之间',
                quantity: '500g',
                budget: '80-120元',
                deadline: '2026-05-15',
                requester: '新手小白',
                requesterId: 1,
                status: 'active',
                createdAt: '2026-04-22'
            },
            {
                id: 2,
                title: '求购古法银配件套装',
                description: '寻找古法银质感的配件，包括隔珠、花托、延长链等，用于手链制作',
                quantity: '1套(约50件)',
                budget: '150-200元',
                deadline: '2026-05-20',
                requester: '手作达人',
                requesterId: 2,
                status: 'active',
                createdAt: '2026-04-20'
            },
            {
                id: 3,
                title: '求购高品质铜线',
                description: '绕线用铜线，要求0.8mm和1.0mm规格，不易氧化，颜色持久',
                quantity: '各10米',
                budget: '50-80元',
                deadline: '2026-05-10',
                requester: '绕线艺术家',
                requesterId: 3,
                status: 'active',
                createdAt: '2026-04-18'
            }
        ];
    }
    getIdleItems(filters) {
        let result = [...this.idleItems];
        if (filters.userId) {
            result = result.filter(i => i.ownerId === filters.userId);
        }
        return {
            total: result.length,
            items: result
        };
    }
    getMaterialRequests(filters) {
        let result = [...this.materialRequests];
        if (filters.userId) {
            result = result.filter(r => r.requesterId === filters.userId);
        }
        if (filters.status) {
            result = result.filter(r => r.status === filters.status);
        }
        return {
            total: result.length,
            items: result
        };
    }
    getIdleItem(id) {
        return this.idleItems.find(i => i.id === id);
    }
    getMaterialRequest(id) {
        return this.materialRequests.find(r => r.id === id);
    }
    publishIdleItem(publishDto) {
        const newItem = {
            id: this.idleItems.length + 1,
            title: publishDto.title,
            description: publishDto.description,
            image: publishDto.image || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20jewelry%20craft%20artwork%20elegant%20design&image_size=square',
            price: publishDto.price,
            owner: '我',
            ownerId: publishDto.ownerId || 1,
            tags: publishDto.tags || [],
            status: 'available',
            views: 0,
            createdAt: new Date().toISOString().split('T')[0]
        };
        this.idleItems.unshift(newItem);
        return newItem;
    }
    publishMaterialRequest(publishDto) {
        const newRequest = {
            id: this.materialRequests.length + 1,
            title: publishDto.title,
            description: publishDto.description,
            quantity: publishDto.quantity,
            budget: publishDto.budget,
            deadline: publishDto.deadline,
            requester: '我',
            requesterId: publishDto.requesterId || 1,
            status: 'active',
            createdAt: new Date().toISOString().split('T')[0]
        };
        this.materialRequests.unshift(newRequest);
        return newRequest;
    }
};
exports.MarketplaceService = MarketplaceService;
exports.MarketplaceService = MarketplaceService = __decorate([
    (0, common_1.Injectable)()
], MarketplaceService);
//# sourceMappingURL=marketplace.service.js.map