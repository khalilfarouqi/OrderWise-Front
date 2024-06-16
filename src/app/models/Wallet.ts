import { User } from "./User";

export interface Wallet {
    id: number;
    sold: number;
    amountCredited: number;
    amountDeposited: number;
    user: User;
    seller: User;
}