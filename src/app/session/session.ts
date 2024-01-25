export interface Session {
    csId?:number;
    batchId?:any;
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
  batchName?:string;
  classStatus?:boolean;
}
export interface Staff{
    userId?:string;
    staffName?:string;

}
