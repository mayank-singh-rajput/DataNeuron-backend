export interface ICreateUser {
    userName: string;
    email: string;
    age: number;
}

export interface IGetUsers {
    _id: string;
    userName: string;
    email: string;
    age: number;
}

export interface IUpdateUser {
    _id: string;
    userName?: string;
    email?: string;
    age?: number;
}