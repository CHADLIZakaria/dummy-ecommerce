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
    slug: string;
    imagePath: string;
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
    avgReview: number;
    reviewsCounts: number;
    favorite: boolean;
    quantity: number;
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
    isFavorite: boolean;
    quantity: number;
}
export type Review = {
    id: number;
    rating: number;
    comment: string;
    username: string;
    userImage: string;
    createdAt: string;
}
export type UserAuth = {
    username: string;
    filePath: string
}
export type FavoriteRespone = {
    message: string,
    isFavorite: boolean
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
        images: [],
        isFavorite: false,
        quantity: 0
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

export const initCategoryPagination: EcomResponse<EcomPagination<Category[]>> = {
    message: '',
    status: 0,
    data: {
        totalElements: 0,
        size: 0,
        page: 0,
        data: []
    }
}

export const initCategory: EcomResponse<Category> = {
    message: '',
    status: 0,
    data: {
        id: 0,
        slug: '',
        imagePath: '',
        title: ''
    }
}

export const initProducts: EcomResponse<Product[]> = {
    message: '',
    status: 0,
    data: []
}

export const initProduct: EcomResponse<EcomPagination<Product[]>> = {
    message: '',
    status: 0,
    data: {
        totalElements: 0,
        size: 0,
        page: 0,
        data: []
    }
}