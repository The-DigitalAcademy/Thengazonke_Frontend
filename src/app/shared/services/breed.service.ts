import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  GetAllBreed(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/breed/getAllBreed').pipe();
  }
  GetAllBreedWithCat(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/breed/getAllBreedWithCat').pipe();
  }
  createBreed(data:any): Observable<any> {
    let API_URL = environment.REST_API + '/breed/createBreed';
    return this.httpClient.post(API_URL, data).pipe();
  }
  updateBreed(id: any, data: any): Observable<any> {
    let API_URL = environment.REST_API + '/breed/updateBreed/'+id;
    return this.httpClient.put(API_URL, data).pipe();
  }


  
  
}
