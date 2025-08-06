import { Brand, Category, EcomPagination, EcomResponse, Product } from "../../../shared/model/ecom.model";

export type ProductFilter = {
    size: number;
    page: number;
    sort: string;
    keyword: string;
    minPrice: number;
    maxPrice: number;
    categories: CategoryWithProduct[];
    brands: Brand[];
    quantity?: number | null;
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
export type CartItem = {
    id?: number;
    productImage: string;
    productName: string;
    quantity: number;
    price: number;
}
export const initProductFilter: ProductFilter = {
    size: 10,
    keyword: '',
    minPrice: 0,
    maxPrice: Number.MAX_VALUE,
    categories: [],
    brands: [],
    page: 0,
    sort: 'id, desc',
    quantity: null
}
export const initBrandWithProduct: EcomResponse<EcomPagination<BrandWithProduct[]>> = {
    message: '',
    status: 0,
    data: {
        totalElements: 0,
        size: 0,
        page: 0,
        data: []
    }
}
export const initCategoryWithProduct: EcomResponse<EcomPagination<CategoryWithProduct[]>> = {
    message: '',
    status: 0,
    data: {
        totalElements: 0,
        size: 0,
        page: 0,
        data: []
    }
}
export const initRangePrice: EcomResponse<{minPrice: number, maxPrice: number}> = {
message: '',
    status: 0,
    data: {
        minPrice: 0,
        maxPrice: 0
    }
}