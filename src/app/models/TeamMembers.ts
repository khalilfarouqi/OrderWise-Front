import { UserType } from "../enum/userType.enum";
import { User } from "./User";

export interface TeamMembers {
    id?: Number;
    fullName?: string;
    userType?: UserType;
    currentLoad?: number;
    availability?: boolean;

    user: User;
}