import { OrderStatus } from "../interfaces/order.interface";
export declare class OrderItemDto {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    userId: string;
    items: OrderItemDto[];
    shippingAddress: string;
    paymentMethod: string;
}
export declare class UpdateOrderDto {
    status?: OrderStatus;
    shippingAddress?: string;
    paymentMethod?: string;
}
