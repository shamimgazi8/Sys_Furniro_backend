export interface IProduct {
    id: number;
    uuid: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IProductCreate {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images?: string[];
}
export interface IProductUpdate {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category?: string;
    images?: string[];
    isActive?: boolean;
}
