import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Email } from '../model/email'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  

  constructor(private http: HttpClient) { }

    sendEmail({ body }: { body: Email; }): Observable<Email> {
      return this.http.post<Email>('/sendEmail',body).pipe();
    }

}
