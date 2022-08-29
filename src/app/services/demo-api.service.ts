import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DemoApiService {
  static readonly APIURL = "https://demo-api.vercel.app";

  constructor(private http: HttpClient) {
  }
  
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(DemoApiService.APIURL + '/users', user)
  }

}
