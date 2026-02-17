export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

export interface TODO {
    id: number,
    task: string,
    completed: boolean
}