import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-staffheader',
  templateUrl: './staffheader.component.html',
  styleUrls: ['./staffheader.component.scss']
})
export class StaffheaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    console.log("staff is there")
  }

  onLogout() {
    this.authService.logout();
  }

}


