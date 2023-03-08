import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Email } from '../shared/models/email'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

    // sendEmail(body:Email): Observable<Email> {
    //   return this.http.post<Email>('http://localhost:3100/sendmail',body);
      
    // }

    sendEmail(body:any): Observable<any> {
      let API_URL = 'http://localhost:3100/sendmail';
      return this.http.post(API_URL, body).pipe();
    }

}