export interface Assignment {

    assignmentId?: string;
    assignmentName?: string;
    assignmentDescription?: string;
    comments?: string;
    dueDate?: Date;
    pathAttachment1?: string;
    pathAttachment2?: string;
    pathAttachment3?: string;
    pathAttachment4?: string;
    pathAttachment5?: string;
    createdBy?: string;
    batchId?: string;
    graderId?: any;
    programId?: number;
    programName?: string;
    batchName?: string;
    staffName?:any;
}

export interface AssignmentSelect {
    assignmentName?: string;
    assignmentId?: string;
}

export interface UploadedAssignment {
    fileId?: number,
    filePath?: string,
    uploadDate?: Date,
    uploadUser?: string,
    assignmentId?: string
}

export interface AssignmentSubmit{
	
    submissionId?: number,
    assignmentId?:number,
    userId?:string,
    subDesc?:string,
    subComments?:string,
    subPathAttach1?:string,
    subPathAttach2?:string,
    subPathAttach3?:string,
    subPathAttach4?:string,
    subPathAttach5?:string,
    subDataTime?: Date,
    gradedBy?:string,
    gradedDateTime?:Date,
    grade?:number
   
}

export interface AssignmentSubmitManage
{
	 assignId?:number
	 }
     export interface Staff1{
        userId?:string;
        staffName?:string;
    }
    