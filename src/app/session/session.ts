export interface Session {

    csId?:number;
    batchId?:string;
    classNo?:number;
    classDate?:Date;
    classTopic?:string;
    classStaffId?:string;
    classDescription?:string;
    classComments?:string;
    classNotes?:any;
    classRecordingPath?:any;
    sessionStatus?:any;
    classStaffName?:any;
}
export interface Staff{
    userId?:string;
    staffName?:string;
}
