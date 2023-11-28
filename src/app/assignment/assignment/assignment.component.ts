import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Assignment, AssignmentSelect, AssignmentSubmit, UploadedAssignment } from '../assignment';
import { AssignmentService } from '../assignment.service';
import { Message } from 'primeng/api'
import { ProgramService } from 'src/app/program/program.service';
import { Program } from 'src/app/program/program';
import { BatchService } from 'src/app/batch/batch.service';
import { Batch } from 'src/app/batch/batch';

import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  assignments: Assignment[];
  assignmentSize: number;
  selectedAssignments: Assignment[];
  visibility: boolean = false;
  assignment: Assignment;
  assigmentDialogue: boolean;
  selectedAssigment: Assignment[];
  submitted: boolean;
  assignmentSelectList: AssignmentSelect[] = [];
  selectedUploadAssignment: AssignmentSelect;
  inputFilePath: string = "";
  userId: string = "";
  subscription: Subscription;
  message1: Message[] = [];
  programList: Program[];
  batchList: Batch[];
  editMode = false;
  //programName: string;
 // batchName: string;
 // date:Date;
  pattername: boolean=false;
  patternDes: boolean=false;
  visibilityManage: boolean = false;
  assignmentsubmits: AssignmentSubmit[];
  assignmentsubmit: AssignmentSubmit;
  assignmentNameList:Assignment[]=[];
  userList: User[] = [];   
  manageDialogue: boolean;
  userManage: AssignmentSubmit[];
  userServices: UserService[];
  assignsub: string[] = ['Yes','No'];
  today = new Date();
  
  constructor(
    private assignmentService: AssignmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private programService: ProgramService,
    private batchService: BatchService,
    private userService: UserService,
    private authService: AuthService) {
    {
      this.programService.getPrograms().subscribe(list => {
        this.programList = list;
      })
    }
    {
      this.batchService.getBatchList().subscribe(list => {
        this.batchList = list;
      })
    }
      {
      this.userService.getAllUsers().subscribe(
      user1List => { this.userList = user1List }
     )
}
{
      this.assignmentService.getAssignments().subscribe(
      assignmentName1List => { this.assignmentNameList = assignmentName1List }
    )
  }
}
  ngOnInit(): void {
    this.getAssignmentList();
    this.subscription = this.authService.loggedInUserId.subscribe((res) => {
      this.userId = res;
    });
 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getMaxAssignmentId(max: number) {
    this.assignments.forEach((character) => {
      let assignmentSelectOption: AssignmentSelect = {};
      assignmentSelectOption.assignmentName = character.assignmentName;
      assignmentSelectOption.assignmentId = character.assignmentId;
      this.assignmentSelectList.push(assignmentSelectOption);
      const tempAssignmentId = Number(character.assignmentId);

      if (tempAssignmentId > max) {
        max = tempAssignmentId;
      }
    });
    return max;
  }
  //add a new assignment 
  openNew() {
    this.editMode=false;
    this.assignment = {};
    this.submitted = false;
    this.assigmentDialogue = true;
  }
  //open a Manage assignment Grade 

openManage(assignId:number) {
	    
	  this.getAssignmentsSubmit(assignId);
      this.assignmentsubmit= {};
      this.manageDialogue = true;
        }
private getAssignmentsSubmit(assignId) {
	
      this.assignmentService.getAssignmentSubmit(assignId).subscribe((res) => {
      this.assignmentsubmit= res;
    });
   
  }
   private getAssignmentSubmitList() {
    this.assignmentService.getAssignmentsSubmitList().subscribe((res) => {
      this.assignmentsubmits = res;
      //this.assignmentSize = this.getMaxAssignmentId(0);
    });    
  }
  findStudentName(studentId: string) {
	  var userdet: User = {};
      var nameUser: String;
      if(userdet = this.userList.find(x => x.userId == studentId)){
      nameUser = userdet.userFirstName + '  ' +userdet.userLastName;
      return nameUser;
      }
      else{
      return nameUser="";
      }
  }
    findAssignName(AssignNameId: number) {
	  var AssignName: Assignment = {};
      var Assignmentname: string;
     if(AssignName = this.assignmentNameList.find(y => Number(y.assignmentId) == AssignNameId)){
      Assignmentname = AssignName.assignmentName;
      return Assignmentname; 
	 }
     else 
      return Assignmentname="";  

  }
  
 private getAssignmentList() {
      this.visibility = true;
      this.assignmentService.getAssignments().subscribe((res) => {
      this.assignments = res;
      this.assignmentSize = this.getMaxAssignmentId(0);
      this.visibility = false;
    });
  }
//pattern validation for Assignment Name
patternDesc()
{
	 const pattern=/^[a-zA-Z][a-zA-Z0-9 -_]{3,25}.*/;
     if(!pattern.test(this.assignment.assignmentDescription)){
		  this.patternDes=true;
		 return true;
	 } 
	 else{
	  this.patternDes=false;
	    return false;}
}
//pattern validation for Assignment Description
patternName()
{
	 const pattern=/^[a-zA-Z][a-zA-Z0-9 ]{3,25}$/;
     if(!pattern.test(this.assignment.assignmentName)){
		 this.pattername=true;
		 return true;
	 } 
	 else{
	    this.pattername=false;
	    return false;}
}


  //save an assigment
  saveAssignment() {
    this.submitted = true;  
   // const atd: any = this.assignment.batchName;
  //  this.assignment.batchId = atd.batchId;
   // const att: any = this.assignment.programName;
    //this.assignment.programId = att.programId;
    if(this.assignment.batchName && this.assignment.programName && this.assignment.dueDate && this.assignment.graderId && !this.pattername && !this.patternDes) {
    if (this.assignment.assignmentName.trim()) { 
      if (this.assignment.assignmentId) { // in Edit 
       
        delete this.assignment.batchName;
        delete this.assignment.programName;
      
        this.assignmentService.updateAssignment(this.assignment).subscribe((res) => {
          this.assignmentService.getAssignments().subscribe((res) => {
            this.assignments = res;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Assignment Updated',
            life: 2000,
          });
        });
      } else { //create new Assignment
         
          const assignBname : any = this.assignment.batchName;
          this.assignment.batchId = assignBname.batchId;
          this.assignment.createdBy=this.assignment.graderId;
        
          delete this.assignment.batchName;
          delete this.assignment.programName;
        
       // this.assignmentSize = this.assignmentSize + 1;
       //this.assignment.batchId = this.assignmentSize;
       // this.assignment.graderId = this.userId;
       // this.assignment.programName = att.programName;
       // this.assignment.batchName = atd.batchName
        this.assignmentService.saveAssignment(this.assignment).subscribe((res) => {
          this.assignmentService.getAssignments().subscribe((res) => {
            this.assignments = res;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Assignment created',
            life: 2000,
          });
        });
      }
      this.assignments = [...this.assignments];
      this.assigmentDialogue = false;
      this.assignment = {};
    }
    }

  }
  hideDialog() {
    this.assigmentDialogue = false;
    this.submitted = false;
  }

  deleteAssigment(assigment: Assignment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + assigment.assignmentName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.assignments = this.assignments.filter((val) => val.assignmentId !== assigment.assignmentId);
        this.assignmentService.delete(assigment).subscribe(response => {
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Assignment Deleted',
          life: 2000,
        });
      },
    });
  }

  editAssignment(assigment: Assignment) {
    this.assignment = { ...assigment };
    this.assignment.dueDate = new Date(this.assignment.dueDate);
    this.getBatchName(this.assignment.batchId);
    this.editMode = true;
    this.assigmentDialogue = true;
  }

  getBatchName(batchId : string){
    for (const batch of this.batchList) {
      if (batch.batchId === batchId) {
          this.assignment.batchName= batch.batchName;
          this.assignment.programName=batch.programName;
          return; 
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.assignments.length; i++) {
      if (this.assignments[i].assignmentId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  // upload Assigment button

  displayUploadAssignmentDialog: boolean = false;

  showDialog() {
    this.displayUploadAssignmentDialog = true;
  }

  closePopup() {
    this.displayUploadAssignmentDialog = false;
  }

  uploadAssignment() {
    const uploadedAssignment: UploadedAssignment = {
      filePath: this.inputFilePath,
      assignmentId: this.selectedUploadAssignment.assignmentId,
      uploadDate: new Date(),
      uploadUser: this.userId
    };
    this.assignmentService.uploadAssignments(uploadedAssignment).subscribe((res) => {
      this.inputFilePath = "";
      this.selectedUploadAssignment = undefined;
      this.closePopup();
      this.message1 = [
        { severity: 'success', summary: 'Filepath Uploaded Successfully', detail: '' }];
    });
  }

}

function hideDialog() {
  throw new Error('Function not implemented.');
}

