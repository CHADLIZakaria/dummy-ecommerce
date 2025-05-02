export type EcomResponse<T> = {
    status: number;
    message: string;
    data: T
}
export type EcomPagination<T> = {
    totalElements: number,
    size: number,
    page: number,
    data: T
}
export type Category = {
    id: number;
    title: string;
    imagePath: string;
}
export type CategoryWithProduct = {
    id: number;
    title: string;
    imagePath: string;
    productCounts: number;
}
export type BrandWithProduct = {
    id: number;
    name: string;
    productCounts: number;
}
export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imagePath: string;
    coverImage: string;
}