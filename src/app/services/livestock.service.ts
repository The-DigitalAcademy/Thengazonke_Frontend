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

  GetLivestockByUser(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/livestock/getPostedLivestockByUser').pipe();
  }

  GetAllPostedLivestock(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/livestock/getPostedLivestock').pipe();
  }
  GetAllLivestock(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/livestock/getLivestock').pipe();
  }

  CreateLivestock(livestockDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/livestock/createLivestock';
    return this.httpClient.post(API_URL, livestockDetails).pipe();
  }
  

  
}
