import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Assignment, AssignmentSelect, UploadedAssignment } from '../assignment';
import { AssignmentService } from '../assignment.service';
import { Message } from 'primeng/api'
import { ProgramService } from 'src/app/program/program.service';
import { Program } from 'src/app/program/program';
import { BatchService } from 'src/app/batch/batch.service';
import { Batch } from 'src/app/batch/batch';


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
  programName: string;
  batchName: string


  constructor(
    private assignmentService: AssignmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private programService: ProgramService,
    private batchService: BatchService,
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
  private getAssignmentList() {
    this.visibility = true;
    this.assignmentService.getAssignments().subscribe((res) => {
      this.assignments = res;
      this.assignmentSize = this.getMaxAssignmentId(0);
      this.visibility = false;
    });
  }

  //add a new assignment 
  openNew() {
    this.assignment = {};
    this.submitted = false;
    this.assigmentDialogue = true;
  }

  //save an assigment
  saveAssignment() {
    this.submitted = true;
    const atd: any = this.assignment.batchName;
    this.assignment.batchId = atd.batchId;
    const att: any = this.assignment.programName;
    this.assignment.programId = att.programId;
    if (this.assignment.assignmentName.trim()) {
      if (this.assignment.assignmentId) {
        this.assignmentService.updateAssignment(this.assignment).subscribe((res) => {
          this.assignmentService.getAssignments().subscribe((res) => {
            this.assignments = res;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: this.assignment.assignmentName + ' Updated',
            life: 3000,
          });
        });
      } else {
        this.assignmentSize = this.assignmentSize + 1;
        this.assignment.batchId = this.assignmentSize;
        this.assignment.graderId = this.userId;
        this.assignment.programName = att.programName;
        this.assignment.batchName = atd.batchName
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
    this.assigmentDialogue = true;
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

