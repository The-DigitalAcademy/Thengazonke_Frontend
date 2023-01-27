import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivestockService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  GetAllPostedLivestock(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/livestock/getPostedLivestock').pipe();   }
   GetAllLivestock(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/livestock/getLivestock').pipe();
  }
  GetLivestockCategories(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/category/getCategory').pipe();
  }

}
