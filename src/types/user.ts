export interface Address {
    city: string;
    country: string;
}

export interface User {
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    address: Address;
}