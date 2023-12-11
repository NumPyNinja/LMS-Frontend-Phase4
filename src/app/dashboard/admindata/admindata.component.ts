import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user';

@Component({
  selector: 'app-admindata',
  templateUrl: './admindata.component.html',
  styleUrls: ['./admindata.component.scss']
})
export class AdmindataComponent implements OnInit {
  userId: string = "";
  users:User[]=[];
  userRoles:String[]=[];
 
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedInUserId.subscribe((res) => {
      this.userId = res;
    });
    this.userRoles=this.authService.loggedInUserRole; 
    this.userRoles = this.authService.loggedInUserRole.map((str) => str.slice(5));

  }
   
}
