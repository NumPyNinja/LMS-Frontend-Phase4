import { UserLogin } from "../userlogin/userlogin";
import { UserRoleMaps } from "./user-role-maps";

export interface User {
    userId?:string;
    userFirstName?: string;
    userMiddleName?:string;
    userLastName?: string;
    userPhoneNumber?: number;
    userLocation?: string;
    userTimeZone?: string,
    userLinkedinUrl?: string;
    userEduUg?: string;
    userEduPg?: string,
    userComments?: string;
    userVisaStatus?: string;
    userLogin?: UserLogin;
    userRoleMaps?: UserRoleMaps[]; 
}

