import { UserLogin } from "../userlogin/userlogin";
import { UserRoleMaps } from "./user-role-maps";
import { UserRoleProgramBatch } from "./user-role-program-batch";

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
    userLoginEmail?:string;
    userLogin?: UserLogin;
    userRoleMaps?: UserRoleMaps[]; 
    programName?: string;
    batchName?: string;
    userStatus?: boolean;
    programId?:number;
    batchid ?:number;
    userRole ? : string;
    userid ?:string;
    userRoleProgramBatches ? : UserRoleProgramBatch[];    
}

