export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface IUserUpdate {
  name?: string;
  phone?: string;
  address?: string;
  role?: string;
}

export interface IAuthPayload {
  email: string;
  sub: string;
  role: string;
}

export interface IJwtPayload {
  email: string;
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}
