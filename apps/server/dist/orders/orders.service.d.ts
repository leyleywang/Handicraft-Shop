export interface OrderItem {
    id: number;
    name: string;
    specs: string;
    price: number;
    quantity: number;
    image: string;
}
export interface Order {
    id: number;
    orderNo: string;
    userId: number;
    status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
    date: string;
    total: number;
    items: OrderItem[];
}
export interface Transaction {
    id: number;
    type: 'sale' | 'purchase';
    title: string;
    price: number;
    date: string;
    counterparty: string;
    image: string;
}
export declare class OrdersService {
    private orders;
    private transactions;
    findAll(filters: {
        userId: number;
        type?: 'material' | 'transaction';
        status?: string;
    }): {
        total: number;
        items: Order[];
    };
    findOne(id: number): Order;
    getTransactions(userId: number): {
        total: number;
        items: Transaction[];
    };
}
