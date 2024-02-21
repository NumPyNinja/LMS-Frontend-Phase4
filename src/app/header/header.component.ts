import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
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

  Program(){
    sessionStorage.setItem('NewProgram','false');
    this.router.navigate(['/program']);
  }
  NewProgram() {
    sessionStorage.setItem('NewProgram','true');
  }
  onLogout() {
    this.authService.logout();
  }

}