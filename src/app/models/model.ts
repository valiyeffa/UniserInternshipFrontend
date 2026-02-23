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
