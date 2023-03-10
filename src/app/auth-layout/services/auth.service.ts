import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  EditUserForm(): any {
    throw new Error('Method not implemented.');
  }
  // updateUser(uid: any, userDetails: { fullname: any; email: any; phone: any; address: any; status: any; usertype: any; }) {
  //   throw new Error('Method not implemented.');
  // }

  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  
  RegisterUser(userDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/users/register';
    return this.httpClient.post(API_URL, userDetails).pipe();
  }
  
  UserLogin(loginDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/users/login';
    return this.httpClient.post(API_URL, loginDetails)
  }

  GetAllUsers(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/users/getUsers', this.httpOptions).pipe();
  }

  updateUser(id: any, data: any): Observable<any> {
    let API_URL = environment.REST_API + '/users/updateUsers/'+id;
    return this.httpClient.put(API_URL, data).pipe();
  }

  DeleteUser(id: any, data: any): Observable<any> {
    console.log(data)
    let API_URL = environment.REST_API + '/users/deleteUser/'+id;
    return this.httpClient.put(API_URL, data).pipe();
  }

}

