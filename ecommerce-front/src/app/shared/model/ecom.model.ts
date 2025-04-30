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