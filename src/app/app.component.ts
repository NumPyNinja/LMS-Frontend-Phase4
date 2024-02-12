import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'LMS';

  isLoggedIn: Observable<boolean>;
  loggedInUserRole:  Observable<string>;
   userRole: string;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
      
    this.authService.loggedInUserRole.subscribe((data: any) => 
    this.userRole =   data[0]); 
  
    console.log("userRoles");
    console.log(this.userRole)
    console.log("isLoggedIn");
    console.log(this.isLoggedIn);
  }
  

}
