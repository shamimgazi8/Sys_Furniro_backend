export interface IOrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: number;
  uuid: string;
  userId: number;
  user?: any;
  totalAmount: number;
  status: OrderStatus;
  items: IOrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderCreate {
  userId: number;
  items: IOrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

export interface IOrderUpdate {
  status?: OrderStatus;
  shippingAddress?: string;
  paymentMethod?: string;
}

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}
