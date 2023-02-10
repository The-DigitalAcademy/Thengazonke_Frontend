import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {


  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  GetNumUsers(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/statistics/getNumUser').pipe();
  }

  GetRegUsersPerMon(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/statistics/getRegisteredUserspermonth').pipe();
  }

  GetNumLivestock(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/statistics/getNumberofLivestockPosted').pipe();
  }

  GetRegLivestockPerMon(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/statistics/getregisteredLivestockperMonth').pipe();
  }

}
