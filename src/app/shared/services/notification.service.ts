import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar,MatSnackBarConfig ,MatSnackBarHorizontalPosition ,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public snackBar: MatSnackBar,private httpClient: HttpClient) { }


  horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  verticalPosition: MatSnackBarVerticalPosition = 'top'
  
  config: MatSnackBarConfig = {
    duration: 7000,
    horizontalPosition : this.horizontalPosition,
    verticalPosition: this.verticalPosition
  };



  success(msg: string): any {
    this.config.panelClass = 'success-snackbar';
    this.snackBar.open(msg, 'Close', this.config)
  }

  danger(msg: string): any {
    this.config.panelClass = 'danger-snackbar';
    this.snackBar.open(msg, 'Close', )
   
  }

  
  warning(msg: string): any {
    this.config.panelClass = 'warning-snackbar';
    this.snackBar.open(msg, 'Close', this.config);
  }

  }
