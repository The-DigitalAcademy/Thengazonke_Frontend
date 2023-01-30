import { HttpHeaders , HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

  rateUser(rates:any):Observable <any>{
    let API_URL = environment.REST_API + '/rate/createRate'
    return this.http.post(API_URL,rates).pipe();
  }

  getRates():Observable<any> {
    return this.http.get(environment.REST_API +'/rate/getRatings').pipe();
  }

}
