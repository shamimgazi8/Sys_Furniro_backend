export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    address?: string;
}
export declare class UpdateUserDto {
    name?: string;
    phone?: string;
    address?: string;
    role?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
