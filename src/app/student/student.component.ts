import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AssignmentSelect, UploadedAssignment } from '../assignment/assignment';
import { AssignmentService } from '../assignment/assignment.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Batch } from 'src/app/batch/batch';
import { BatchService } from 'src/app/batch/batch.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  inputFilePath: string = "";
  selectedUploadAssignment: AssignmentSelect;
  message1: Message[] = [];
  userId: string = "";
  assignmentSelectList: AssignmentSelect[] = [];
  visibility: boolean = false;
  users: User[];
  selectedUsers: User[];
  user: User;
  batchList: Batch[];
  batch : Batch;
  getBatchList: Batch[];
  first: number;


  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private batchService: BatchService
  ) {}

  ngOnInit(): void {
    this.userService.getAllStudents().subscribe((data)=>{
      this.users = data;
    });
    this.batchService.getBatchList().subscribe((data)=>{
      this.batchList = data;
    });
  }



  // upload Assigment button

  displayUploadAssignmentDialog: boolean = false;

  showDialog() {
    this.displayUploadAssignmentDialog = true;
  }

  closePopup() {
    this.displayUploadAssignmentDialog = false;
  }

  // uploadAssignment() {
  //   const uploadedAssignment: UploadedAssignment = {
  //     filePath: this.inputFilePath,
  //     assignmentId: this.selectedUploadAssignment.assignmentId,
  //     uploadDate: new Date(),
  //     uploadUser: this.userId
  //   };
  //   this.assignmentService.uploadAssignments(uploadedAssignment).subscribe((res) => {
  //     this.inputFilePath = "";
  //     this.selectedUploadAssignment = undefined;
  //     this.closePopup();
  //     this.message1 = [
  //       { severity: 'success', summary: 'Filepath Uploaded Successfully', detail: '' }];
  //   });
  // }

}


