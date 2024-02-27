import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
 })
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService,
    private router: Router) { }
  ngOnInit() { 
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  NewUser() { 
    sessionStorage.setItem('NewUser1', 'true');
  }
  AssignStaff(){
    sessionStorage.setItem('AssignStaff1', 'true');
  }
  AssignStudent(){
    sessionStorage.setItem('AssignStudent1', 'true');
    }
  Batch(){
    sessionStorage.setItem('NewBatch1', 'false');
    this.router.navigate(['/batch']);
  }
  NewBatch(){
    sessionStorage.setItem('NewBatch1', 'true');
  }
  AddAssign(){ 
      sessionStorage.setItem('AddAssign1', 'true');
      
    }
    AddAttendance(){ 
      sessionStorage.setItem('AddAttendance1', 'true');      
    }
  onLogout() {
    this.authService.logout();
  }

}


