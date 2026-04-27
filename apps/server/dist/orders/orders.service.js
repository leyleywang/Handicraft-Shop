"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
let OrdersService = class OrdersService {
    constructor() {
        this.orders = [
            {
                id: 1,
                orderNo: 'MO20260425001',
                userId: 1,
                status: 'completed',
                date: '2026-04-25',
                total: 226,
                items: [
                    {
                        id: 1,
                        name: '天然石碎石混装',
                        specs: '3-8mm，约100颗/100g',
                        price: 68,
                        quantity: 2,
                        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20natural%20gemstone%20chips%20in%20various%20colors%20moonstone%20amethyst%20rose%20quartz%20tigers%20eye%20on%20white%20background&image_size=square'
                    },
                    {
                        id: 2,
                        name: '捷克水晶珠套装',
                        specs: '约200颗，含10种颜色5种形状',
                        price: 88,
                        quantity: 1,
                        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=czech%20crystal%20glass%20beads%20assorted%20colors%20shapes%20faceted%20for%20jewelry%20making%20on%20white%20background&image_size=square'
                    }
                ]
            },
            {
                id: 2,
                orderNo: 'MO20260418002',
                userId: 1,
                status: 'shipped',
                date: '2026-04-18',
                total: 128,
                items: [
                    {
                        id: 1,
                        name: '古法银配件套装',
                        specs: '约50件/套，含6种常用规格',
                        price: 128,
                        quantity: 1,
                        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20style%20silver%20jewelry%20findings%20spacer%20beads%20bead%20caps%20chain%20extensions%20lobster%20clasps%20on%20white%20background&image_size=square'
                    }
                ]
            }
        ];
        this.transactions = [
            {
                id: 1,
                type: 'sale',
                title: '月光石缠绕手链',
                price: 399,
                date: '2026-04-24',
                counterparty: '水晶爱好者',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20moonstone%20wire%20wrapped%20bracelet%20handmade%20jewelry%20shimmering%20blue%20light%20on%20white%20background&image_size=square'
            },
            {
                id: 2,
                type: 'sale',
                title: '天然石串珠耳环',
                price: 168,
                date: '2026-04-20',
                counterparty: '时尚达人',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20natural%20stone%20beaded%20earrings%20amethyst%20rose%20quartz%20delicate%20jewelry%20on%20white%20background&image_size=square'
            },
            {
                id: 3,
                type: 'purchase',
                title: '紫水晶圆珠散珠',
                price: 158,
                date: '2026-04-15',
                counterparty: '晶石供应商',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=natural%20amethyst%20round%20beads%20purple%20crystal%20gemstone%20beads%20for%20jewelry%20making%20on%20white%20background&image_size=square'
            }
        ];
    }
    findAll(filters) {
        let result = this.orders.filter(o => o.userId === filters.userId);
        if (filters.status) {
            result = result.filter(o => o.status === filters.status);
        }
        return {
            total: result.length,
            items: result
        };
    }
    findOne(id) {
        return this.orders.find(o => o.id === id);
    }
    getTransactions(userId) {
        return {
            total: this.transactions.length,
            items: this.transactions
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map