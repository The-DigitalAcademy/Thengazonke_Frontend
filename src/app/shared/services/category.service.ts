import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  GetAllCategory(): Observable<any> {
    return this.httpClient.get(environment.REST_API + '/category/getCategory', this.httpOptions).pipe();
  }

  createCategory(categoryDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/category/createCategory';
    return this.httpClient.post(API_URL, categoryDetails).pipe();
  }


  updateCategory(id: any, categoryDetails: any): Observable<any> {
    let API_URL = environment.REST_API + '/category/updateCategory/'+id;
    return this.httpClient.put(API_URL, categoryDetails).pipe();
  }

  DeleteCategory(id: any, data: any): Observable<any> {
    console.log(data)
    let API_URL = environment.REST_API + '/users/deleteUser/'+id;
    return this.httpClient.put(API_URL, data).pipe();
  }
 
  

}
