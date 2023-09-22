export declare type Order = 'ASC' | 'DESC';
export interface QueryInt {
    order: Order;
    sortBy: string;
    limit: string;
    skip: string;
    page: string;
}
export interface Shopping {
    model: string;
    brands: number[];
    frets: number[];
    prices: number[];
    available: number;
    shipping: boolean;
}
export interface BodyInt {
    filters: Shopping;
}
export interface Filter extends QueryInt, Shopping {
}
