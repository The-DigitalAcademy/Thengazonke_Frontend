import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  
  RegisterUser(userDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/users/register';
    return this.httpClient.post(API_URL, userDetails).pipe();
  }
  
  UserLogin(loginDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/users/login';
    return this.httpClient.post(API_URL, loginDetails)
  }

  ///////////

/*
  GetAllUsers(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/users').pipe();
  }

  AddUser(userDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/users/register';
    return this.httpClient.post(API_URL, userDetails).pipe();
  }

  updateUser(id: any, data: any): Observable<any> {
    let API_URL = environment.REST_API + '/users/'+id;
    return this.httpClient.put(API_URL, data).pipe();
  }
*/

}



