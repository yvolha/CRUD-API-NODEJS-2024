import { IDatabase } from "./database.type";

export const DATABASE: IDatabase = {};

export const DATABASE_REQUIRED_PROPERTIES: string[] = [
    'id', 'username', 'age', 'hobbies',
]