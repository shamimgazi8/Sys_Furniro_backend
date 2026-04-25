export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images?: string[];
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category?: string;
    images?: string[];
    isActive?: boolean;
}
