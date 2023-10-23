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
  selectedAttendance: Attendance[];
  submitted: boolean;
  programList: Program[];
  selectedProgram: string;
  sessionList: Session[];
  selectedClasses: Session[];
  selectedStudents: User[];
  //selectedDate: Date;
  users: User[];
  attendanceDrop: string[]=['Present','Absent','Late','Excused'];
  selectedDrop:string[]=this.attendanceDrop;

  constructor(
    private attendanceService: AttendanceService,
    private messageService: MessageService,
    private programService: ProgramService,
    private confirmationService: ConfirmationService,
    private sessionService:SessionService,
    private userService: UserService) {
    
  }

  ngOnInit(): void {
    this.getAttendanceList();
    this.programService.getPrograms().subscribe(list => {
      this.programList = list;
    })
    this.userService.getAllUsers().subscribe(
     userList2=>{this.users=userList2}
    )
    this.sessionService.getSessions().subscribe(res=>{
      this.sessionList=res
    })
   
  }

  private getAttendanceList() {
    this.visibility = true;
    
    this.attendanceService.getAttendanceList().subscribe((res) => {
      this.attendances = res;

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
    this.submitted = false;
  }

  //save an attendance 
  saveAttendance() {
   
    this.submitted = true;
    //edit
    
      if(this.attendance.programId){
         this.attendances[this.findIndexById(this.attendance.attId)] = this.attendance;

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Attendance Updated',
        life: 3000,
      });
      
      this.attendanceService.updateAttendance(this.attendance).subscribe((res) => {
        console.log('a attendance is save')
      });

    } else {
      let newAttendanceCount: number = 1;
      this.selectedClasses.forEach((selectedClass) => {
        this.selectedStudents.forEach((selectedStudent) => {
          let attendance: Attendance = {};
          attendance.csId = selectedClass.csId.toString();
          attendance.studentId = selectedStudent.userId;
          attendance.attendance = this.selectedDrop.toString();
          this.attendanceService.addAttendance(attendance).subscribe((res) => {
            newAttendanceCount = newAttendanceCount + 1;
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
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: newAttendanceCount + ' new attendances created',
        life: 3000,
      });
      this.getAttendanceList();
    }
    this.attendanceDialogue = false;
  }
  //}
  deleteAttendance(attendance: Attendance) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + attendance.attId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attendances = this.attendances.filter((val) => val.attId !== attendance.attId);

        this.attendanceService.delete(attendance).subscribe(response => {
          
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Attendance delete',
          life: 3000,
        });
      },
    });
  }

  editAttendance(attendance: Attendance) {
    this.attendance = { ...attendance };
    this.attendanceDialogue = true;
    //data:attendance;
    this.attendance={};
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.attendances.length; i++) {
      if (this.attendance[i].attendanceId === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
