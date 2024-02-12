import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { ClassService } from 'src/app/class/class.service';
import { Class } from 'src/app/class/class';
import { SessionService } from 'src/app/session/session.service';
import { Session } from 'src/app/session/session';

@Component({
  selector: 'app-classesforstaff',
  templateUrl: './classesforstaff.component.html',
  styleUrls: ['./classesforstaff.component.scss']
})
export class ClassesforstaffComponent implements OnInit {

  displayedColumns: string[] = [
    'BatchName',
    'ClassTopic',
    'ClassDate',
    'classNotes',
  ];

  classData: Session[];
  public rowID: string;
  dialogRef: any;
  public selectedStaff: User;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>();

  constructor(private dialog: MatDialog, private sessionService: SessionService) {
    
    this.sessionService.getSessionListForStaffId('U02').subscribe(us => {
      this.classData = us;
      var result = [];
      console.log("this.classData");
      console.log(this.classData);


    })
  }

  findBatchName(batchId: string) {
    //if (this.batchList.length != 0) {
      //return this.batchList.filter(x => x.batchId == batchId)[0].batchName;
    //}
  }

 

  onCloseDialog() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
  }
}


