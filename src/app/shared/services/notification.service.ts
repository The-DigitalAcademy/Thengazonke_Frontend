import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public snackBar: MatSnackBar,private httpClient: HttpClient) { }

  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  success(msg: string): any {
    this.config.panelClass = 'success-snackbar';
    this.snackBar.open(msg, 'Close', this.config);
  }
  danger(msg: string): any {
    this.config.panelClass = 'danger-snackbar';
    this.snackBar.open(msg, 'Close', this.config);
  }
  warning(msg: string): any {
    this.config.panelClass = 'warning-snackbar';
    this.snackBar.open(msg, 'Close', this.config);
  }

  }
