import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-studentheader',
  templateUrl: './studentheader.component.html',
  styleUrls: ['./studentheader.component.scss']
})
export class StudentheaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
 

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

}
