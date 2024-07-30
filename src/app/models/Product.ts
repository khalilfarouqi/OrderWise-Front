import { Photo } from "./Photo";
import { User } from "./User";

export interface Product {
    id?: Number;
    productNom?: string;
    description?: string;
    purchasePrice?: number;
    sellingPrice?: number;
    weight?: number;

    seller: User;
    photo?: Photo;
}