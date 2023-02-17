import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Notification } from '../model/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {



  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public snackBar: MatSnackBar,private httpClient: HttpClient ) { }

  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  success(msg: string): void {
    this.config.panelClass = 'success-snackbar';
    this.snackBar.open(msg, 'Close', this.config);
  }
  danger(msg: string): void {
    this.config.panelClass = 'danger-snackbar';
    this.snackBar.open(msg, 'Close', this.config);
  }
  warning(msg: string): void {
    this.config.panelClass = 'warning-snackbar';
    this.snackBar.open(msg, 'Close', this.config);
  }

    getAllNotification(): Observable<Notification> {
      return this.httpClient.get<Notification>(environment.REST_API +'/notification/getAllNotifications').pipe();
    }

    createNotification({ body }: { body: Notification; }): Observable<Notification> {
      return this.httpClient.post<Notification>(environment.REST_API +'/notification/createNotifications',body).pipe();
    }

  }
