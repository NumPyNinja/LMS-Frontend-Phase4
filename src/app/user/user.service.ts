import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { map, take } from 'rxjs/operators';

import { User } from './user';
//import { UserProgBatch } from './user-prog-batch';
import { STRING_TYPE, Text } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url: string = '/api';//'https://lms-admin-rest-service.herokuapp.com/programs';
  users: any;
  //staffList: User[];
   //result: User[]
   staffUList: Observable<User[]>

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    //return this.httpClient.get<any>('assets/Users.json')
    return this.httpClient.get<User[]>(this.url + "/users/roles");
  }

  getAllUsers(): Observable<User[]> {
    //return this.httpClient.get<any>('assets/Users.json')
    return this.httpClient.get<User[]>(this.url + "/users");
  }

  addUser(userData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(this.url + '/users/roleStatus', userData, { headers });

  }

  getAllStaff(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/users/roles/R02")
    
  }
  getAllStudents(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/users/roles/R03")
    
  }
  updateUser(user: User) {
    return this.httpClient.put<User>(this.url + "/users/" + user.userId ,user);
  }

  deleteUser(user:User) {
    return this.httpClient.delete<User>(this.url + "/users/" + user.userId);
  }
  
  assignProgBatch(pbData:any): Observable<any>{
    return this.httpClient.put<any>(this.url + "/users/roleProgramBatchStatus/" + pbData.userId, pbData );
  }
/*** ignore the below extra method  
assignProgBatchTemp(pbData:any): Observable<UserProgBatch>{
    return this.httpClient.put<UserProgBatch>(this.url + "/users/roleProgramBatchStatus/" + pbData.userId, pbData );
  }
  **/    
}

