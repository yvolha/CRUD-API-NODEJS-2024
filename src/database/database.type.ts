export type IUser = {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
};

export type IDatabase = Record<string, IUser>;