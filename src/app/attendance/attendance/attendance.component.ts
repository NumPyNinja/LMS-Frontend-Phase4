import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Program } from 'src/app/program/program';
import { ProgramService } from 'src/app/program/program.service';
import { Session } from 'src/app/session/session';
import { SessionService } from 'src/app/session/session.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Attendance } from '../attendance';
import { AttendanceService } from '../attendance.service';
import { Batch } from 'src/app/batch/batch';
import { BatchService } from 'src/app/batch/batch.service';
import { StudentComponent } from 'src/app/student/student.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
 // selectedCountries: any[];
  attendances: Attendance[];
 // countries: Attendance[];
  attendanceSize: number;
  studentName:string;
  selectedAttendances: Attendance[];
  visibility: boolean = false;
  attendance: Attendance;
  attendanceDialogue: boolean;
  editAttendanceDialogue: boolean;
  selectedAttendance: Attendance[];
  submitted: boolean;
  batchList: Batch[];
  selectedBatches: string;
  sessionList: Session[];
  selectedClasses: Session[];
  selectedStudents: User[];
  users: User[];
  attendanceDrop: string[]=['Present','Absent','Late','Excused'];
  selectedDrop:string[];
  selectedDate: Date;
  maxDate : Date;  
  minDate = new Date();

  constructor(
    private attendanceService: AttendanceService,
    private messageService: MessageService,
    private batchService: BatchService,
    private confirmationService: ConfirmationService,
    private sessionService:SessionService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    
    this.batchService.getBatchList().subscribe(list => {
      this.batchList = list;
    })

    this.userService.getAllUsers().subscribe(
     userList2=>{
      this.users=userList2;
    })

    this.sessionService.getSessions().subscribe(res=>{
      this.sessionList=res;
      this.getAttendanceList();
    })

    this.maxDate = new Date();
    this.minDate.setDate(this.maxDate.getDate() - 6); 
  
  }

  private getAttendanceList() {
    this.visibility = true;
   
    
    this.attendanceService.getAttendanceList().subscribe((res) => {
      this.attendances = res;

    for (let index = 0; index < this.attendances.length; index++) {
      
       const student = this.users.find(student => student.userId == this.attendances[index].studentId);
       if (student != null)  this.attendances[index].studentName = student.userFirstName;
     
       const cls = this.sessionList.find(cls => cls.csId == this.attendances[index].csId);
       if (cls != null)  this.attendances[index].csName = cls.classTopic;

       const batch = this.batchList.find(batch => batch.batchId == cls.batchId);
       if (batch != null)  this.attendances[index].batchName = batch.batchName;

    }
      console.log('Backend data' + res)
      this.attendanceSize = this.getMaxAttendanceId(0);
      this.visibility = false;
    });
  }


  private getMaxAttendanceId(max: number) {
    this.attendances.forEach((character) => {
      const tempAttendanceId = Number(character.attId);

      if (tempAttendanceId > max) {
        max = tempAttendanceId;
      }
    });
    return max;
  }
 
  //add a new attendance 
  async openNew() {
    this.attendance = {};
    this.submitted = false;
    this.attendanceDialogue = true;
    
    //await this.classService.getClassList().subscribe(res => {
     // this.classList = res;
    //})
    this.sessionService.getSessions().subscribe(res=>{
      this.sessionList=res
    })

     this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    })

  }

  hideDialog() {
    this.attendanceDialogue = false;
    this.editAttendanceDialogue = false;
    this.submitted = false;
    this.selectedStudents = null;
    this.selectedClasses = null;
    this.selectedDate = null;
    this.selectedDrop = null; 
  }

  //save an attendance 
  saveAttendance() {
   if(this.editAttendanceDialogue==true){
    
    let editedAttendance: Attendance = {};
    editedAttendance.attId=this.attendance.attId;
    editedAttendance.csId = this.attendance.csId;
    editedAttendance.studentId = this.attendance.studentId;
    editedAttendance.attendance = this.attendance.attendance;
    editedAttendance.attendanceDate=this.attendance.attendanceDate;
    this.attendanceService.updateAttendance(editedAttendance).subscribe((res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'attendances updated',
        life: 3000,
      });
    }, err => {
      this.messageService.add({
        severity: 'failure',
        summary: 'Failed',
        detail: 'Attendance updation failed',
        life: 3000,
      });
    });
    this.ngOnInit();
    this.editAttendanceDialogue = false;
  }
   else {
    this.submitted = true;
    //checking attendance already exist or not
    for (let index = 0; index < this.selectedStudents.length; index++) {
      const newStudent = this.selectedStudents[index];
      for (let i = 0; index < this.selectedClasses.length; index++) {
        const newClass = this.selectedClasses[i];
        let attendance = this.attendances.findIndex(att => att.csId === newClass.csId && att.studentId === newStudent.userId);

        if(attendance != -1){
          alert('Cannot add. Attendance already exist');
        } else {
            this.selectedClasses.forEach((selectedClass) => {
              this.selectedStudents.forEach((selectedStudent) => {
                let attendance: Attendance = {};
                attendance.csId = selectedClass.csId;
                attendance.studentId = selectedStudent.userId;
                attendance.attendance = this.selectedDrop.toString();
                attendance.attendanceDate = this.selectedDate;
                this.attendanceService.addAttendance(attendance).subscribe((res) => {          
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'new attendances created',
                    life: 3000,
                  });
                }, err => {
                  this.messageService.add({
                    severity: 'failure',
                    summary: 'Failed',
                    detail: 'Attendance creation failed',
                    life: 3000,
                  });
                });
              });
            })
            this.ngOnInit();
            this.attendanceDialogue = false;  
            this.selectedStudents = null;
            this.selectedClasses = null;
            this.selectedDate = null;
            this.selectedDrop = null;
          }
      }}    
      this.selectedAttendances = null;
  }}
  //delete
  deleteAttendance(attendance: Attendance) {
    
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + attendance.attId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       
        this.attendances = this.attendances.filter((val) => val.attId !== attendance.attId);

        this.attendanceService.delete(attendance).subscribe(response => {         
              
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Selected attendence deleted'});
      }) 
        this.ngOnInit(); 
      },
      reject: () => {this.getAttendanceList()},
      key: "deleteDialog"
    });
     
  }

  editAttendance(attendance: Attendance) {
    this.attendance = { ...attendance };
    this.editAttendanceDialogue = true;
    this.attendance.creationTime = new Date(this.attendance.creationTime);
    this.submitted=false;
    
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.attendances.length; i++) {
      if (this.attendance[i].attId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  deleteSelectedAttendances(){

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Attendances?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attendances = this.attendances.filter(
            (val) => this.selectedAttendances.includes(val)
        );        
        this.selectedAttendances.forEach((value)=> (
          this.attendanceService.delete(value).subscribe(response => {   
            
          })  
        )) ;      
        this.ngOnInit();  
        this.selectedAttendances = null;
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Selected attendences deleted'});},
      reject: () => {
        this.selectedAttendances = null;
      },
      key: "myDialog"
    });
  }

 
}
