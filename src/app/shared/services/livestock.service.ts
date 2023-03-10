import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LivestockService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }


  GetLivestockCategories(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/category/getCategory').pipe();
  }

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

  updateLivestock(id:any, data:any): Observable<any> {
    let API_URL = environment.REST_API + '/livestock/updateLivestock/'+ id;
    return this.httpClient.put(API_URL, data).pipe();
  }

  deleteLivestock(id:any, status:any): Observable<any> {
  
    console.log(id, status);
    let API_URL = environment.REST_API + '/livestock/deleteLivestock/'+id;
    return this.httpClient.put(API_URL, status).pipe();

    // return this.httpClient.get(environment.REST_API + '/livestock/deleteLivestock').pipe();
  }
  
}
