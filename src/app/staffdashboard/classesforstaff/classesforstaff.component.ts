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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-classesforstaff',
  templateUrl: './classesforstaff.component.html',
  styleUrls: ['./classesforstaff.component.scss']
})
export class ClassesforstaffComponent implements OnInit {

  displayedColumns: string[] = [
    
    'classTopic',
    'batchName',
    'classNo',
    'classDate'

  ];

  classData: Session[];
  public rowID: string;
  dialogRef: any;
  public selectedClass: Session;
  datePipe: DatePipe = new DatePipe('en-US');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Session>();

  constructor(private dialog: MatDialog, private sessionService: SessionService) {
    
    this.sessionService.getSessionListForStaffId('U02').subscribe(us => {
      this.classData = us;
     
      this.dataSource.data  = us;
      console.log("this.classData");
      console.log(this.dataSource.data );


    })
   
  }

  getFormattedDate(){
    
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return transformDate;

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


