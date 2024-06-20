import { Photo } from "./Photo";
import { User } from "./User";

export interface product {
    id?: Number;
    productNom?: string;
    purchasePrice?: number;
    sellingPrice?: number;
    weight: number;

    seller?: User;
    photo?: Photo;
}