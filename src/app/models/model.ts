export interface Page {
    id: number;
    title: string;
    link: string;
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
