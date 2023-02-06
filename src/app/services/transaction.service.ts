import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  GetAllTransaction(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/transaction/getAllTransaction').pipe();
  }

  getFullTransaction (): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/transaction/getFullTransaction').pipe();
  }

  getTransaction(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/transaction/getAllTransaction').pipe();
  }
  CreateTranstaction(transaction:any): Observable<any> {
    let API_URL = environment.REST_API + '/transaction/createTransaction';
    return this.httpClient.post(API_URL, transaction).pipe();
  }

  // updateUser(id: any, data: any): Observable<any> {
  //   let API_URL = environment.REST_API + '/users/updateUsers/'+id;
  //   return this.httpClient.put(API_URL, data).pipe();
  // }
  // '/transaction/updateTransaction/:id
  // /transaction/createTransactio

}
