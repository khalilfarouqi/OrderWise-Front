import { Product } from "./Product";

export interface Stock {
    id?: Number;
    quantity?: Number;
    additionDate?: Date;
    lastSaleDate?: Date;
    lastModifiedDate?: Date;

    products: Product;
}