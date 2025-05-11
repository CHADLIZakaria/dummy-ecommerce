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
export type Brand = {
    id: number;
    name: string;
}
export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    coverImage: string;
}
export type ProductDetails = {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    coverImage: string;
    images: string[];
}
export type Review = {
    id: number;
    rating: number;
    comment: string;
    username: string;
    userImage: string;
}

export const initProductDetails: EcomResponse<ProductDetails> = {
    message: '',
    status: 0,
    data: {
        id: 0,
        sku: '',
        name: '',
        slug: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        coverImage: '',
        images: []
    }
}

export const initReviewPagination: EcomResponse<EcomPagination<Review[]>> = {
    message: '',
    status: 0,
    data: {
        totalElements: 0,
        size: 0,
        page: 0,
        data: []
    }
}