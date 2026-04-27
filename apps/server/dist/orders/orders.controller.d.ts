import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(userId: string, type?: 'material' | 'transaction', status?: string): {
        total: number;
        items: import("./orders.service").Order[];
    };
    findOne(id: string): import("./orders.service").Order;
    getTransactions(userId: string): {
        total: number;
        items: import("./orders.service").Transaction[];
    };
}
