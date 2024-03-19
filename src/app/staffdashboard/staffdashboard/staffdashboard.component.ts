import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-staffdashboard',
  templateUrl: './staffdashboard.component.html',
  styleUrls: ['./staffdashboard.component.scss']
})
export class StaffdashboardComponent implements OnInit {

  userId: string = "";
 
  userRoles:string="";
 
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedInUserId.subscribe((res) => {
      this.userId = res;
    });
   
  this.authService.loggedInUserRole.subscribe((data:any) =>   this.userRoles =  data[0].slice(5));

  }

}
