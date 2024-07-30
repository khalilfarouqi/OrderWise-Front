import { City } from "../enum/city.enum";
import { Gender } from "../enum/gender.enum";
import { Role } from "../enum/role.enum";
import { UserType } from "../enum/userType.enum";

export interface User {
    id?: Number;
    lastCheckIn?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    fullName?: string;
    email?: string;
    password?: string;
    cin?: string;
    tel?: string;
    image?: string;

    city?: City;
    gender?: Gender;
    role?: Role;
    userType?: UserType;
}