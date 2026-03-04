export interface Courses {
    id: number;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    price: number;
    discountPrice: number;
    rating: number;
    isPopular: boolean;
}

export interface Students {
    id: number;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    age: number;
    gender: string;
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
