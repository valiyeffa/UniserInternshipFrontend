export interface Modules {
    id: number;
    url: string;
    value: string;
    color: string;
    icon: string;
    code:string;
}

export interface Subjects {
    id: string;
    name: string;
}

export interface StudentList {
    id: number;
    name: string;
    surname: string;
    email: string;
    age: number | any;
    subjects: Subjects[] | string | any;
}

export interface LoginForm {
    username: string,
    password: string
}