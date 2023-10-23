import { Component, OnInit, Inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Session } from '../session';
import { SessionService } from '../session.service';
import { Batch } from 'src/app/batch/batch';
import { BatchService } from 'src/app/batch/batch.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { InputNumber } from 'primeng/inputnumber';
import { Dropdown, DropdownItem } from 'primeng/dropdown';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 250px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],

})
export class SessionComponent implements OnInit {
  sessionDialogue: boolean;
  sessionList: Session[];
  session: Session;
  selectedSessions: Session[];
  submitted: boolean;
  sessionSize: number;
  visibility: boolean = false;
  batchId: number;
  batchList: Batch[] = [];
  csId: string;
  userList: User[] = [];
  userId: string;
  batchName: string
  staffName: string
  public selectedSession: Session;
  public rowID: string;
  dialogRef: any;


  constructor(private dialog: MatDialog, private sessionService: SessionService,
    private userService: UserService,
    private batchService: BatchService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.batchService.getBatchList().subscribe(
      batList => { this.batchList = batList; })
    this.userService.getAllUsers().subscribe(
      user1List => { this.userList = user1List }
    )
    this.getSessionList();



  }
  openNew() {
    this.session = {};
    this.submitted = false;
    this.sessionDialogue = true;

  }
  hideDialog() {
    this.sessionDialogue = false;
    this.submitted = false;
  }

  addSession() {

    this.submitted = true;
    if (this.session.classTopic.trim()) {
      const bat: any = this.session.batchId;
      this.session.batchId = bat.batchId;
      const user1: any = this.session.classStaffId;
      this.session.classStaffId = user1.userId;
      //edit class
      if (this.session.csId) {
        this.sessionList[this.findIndexById(this.session.csId)] = this.session;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Class Updated',
          life: 3000,
        });
        this.session.batchId = bat;
        this.session.classStaffId = user1;
        this.sessionService.editSession(this.session).
          subscribe((res) => {
            console.log("Class is Updated")
            return res;
          });
      } else {
        //add a new class

        this.sessionList.push(this.session);
        this.session.batchId = bat.batchId;
        this.session.classStaffId = user1.userId;
        this.sessionService.addSession(this.session).subscribe((res) => { });

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Class Created',
          life: 3000,
        });
        this.getSessionList();
      } (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: error,
          life: 3000,
        });
      }
      this.sessionList = [...this.sessionList];
      this.sessionDialogue = false;
      this.session = {};
    }
  }
  findIndexById(id: number): number {
    let index = -1;
    if (this.sessionList !== undefined)
      for (let i = 0; i < this.sessionList.length; i++) {
        if (this.sessionList[i].csId === id) {
          index = i;
          break;
        }
      }
    return index;
  }
  private getSessionList() {
    this.sessionService.getSessions().subscribe(res => {
      this.sessionList = res;
      this.visibility = false;
    })
  }
  editSession(session: Session) {
    this.session = { ...session };
    this.session.classDate = new Date(this.session.classDate);
    this.sessionDialogue = true;
  }

  getMaxClassId(max: number) {
    this.sessionList.forEach((character) => {
      const tempSessionId = Number(character.csId);
      if (tempSessionId > max) {
        max = tempSessionId;
      }
    });
    return max;

  }
  deleteSelectedClass() {
    this.confirmationService.confirm({

      message: 'Are you sure you want to delete the selected classes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sessionList = this.sessionList.filter(
          (val) => !this.selectedSessions.includes(val)
        );
        this.selectedSessions = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Classes Deleted',
          life: 3000,
        });
      },
    });


  }
  deleteSession(session: Session) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + session.classTopic + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sessionList = this.sessionList.filter((val) => val.csId !== session.csId);
        this.sessionService.deleteSession(session).subscribe(res => {
          console.log('Class is Deleted');
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Class Deleted',
          life: 3000,
        });
      },
    });
  }

  findBatchName(batchId: string) {
    if (this.batchList.length != 0) {
      return this.batchList.filter(x => x.batchId == batchId)[0].batchName;
    }
  }

  findStaffName(staffId: string) {
    var nameUser: String;
    var userdet: User = {};
    if (this.userList.length != 0) {
      userdet = this.userList.find(y => y.userId == staffId);
      nameUser = userdet.userFirstName + '  ' + userdet.userLastName;
      return nameUser;
    }
  }

  onRowClicked(templateRef, row) {

    this.rowID = row['csId'];
    this.selectedSession = this.sessionList.find((session) => session.csId.toString() == this.rowID);
    this.dialogRef = this.dialog.open(templateRef, {
      height: '550px',
      width: '700px',
    });
  }


  onCloseDialog() {
    this.dialogRef.close();
  }

}