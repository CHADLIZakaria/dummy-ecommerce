import { EcomPagination, EcomResponse } from "../../../shared/model/ecom.model";

export type ProductFilter = {
    size: number;
    page: number;
    sort: string;
    keyword: string;
    minPrice: number;
    maxPrice: number;
    idsCategory: string;
    idsBrand: string;
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
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}
export const initProductFilter: ProductFilter = {
    size: 10,
    keyword: '',
    minPrice: 0,
    maxPrice: Number.MAX_VALUE,
    idsCategory: '',
    idsBrand: '',
    page: 0,
    sort: 'id, desc'
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
