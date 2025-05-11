export type ProductFilter = {
    size: number;
    keyword: string;
    minPrice: number;
    maxPrice: number;
    idsCategory: string;
    idsBrand: string;
}

export const initProductFilter: ProductFilter = {
    size: 10,
    keyword: '',
    minPrice: 0,
    maxPrice: 10000,
    idsCategory: '',
    idsBrand: ''
}
