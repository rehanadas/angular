import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { EmailModel } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  private localUrl = "https://devgroceryapi.spericorn.com/api";
  private auth_token = localStorage.getItem('token');
  //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJBc2hvayIsImVtYWlsIjoiYXNob2tAc3Blcmljb3JuLmNvbSIsInJvbGUiOjQsImlhdCI6MTU5MTYwMDkxNywiZXhwIjoxNTkzMjc4OTE4NjA5fQ.O38c12nGe9MHTR6i9KPy8SzQYBbrJ10FxEwTcO25JQ0";

  constructor(private http: HttpClient) {
  }
  login(model: LoginModel): Observable<any> {
    let apiUrl = `${this.localUrl}/auth/login`;
    return this.http.post<any>(apiUrl, model, this.getRequestHeaderWithToken());
  }
  getProfile(): Observable<any> {
    let apiUrl = `${this.localUrl}/user`;
    return this.http.get<any>(apiUrl, this.getRequestHeaderWithToken());
  }
  checkMailExist(model: EmailModel): Observable<any> {
    let apiUrl = `${this.localUrl}/auth/checkMail`;
    return this.http.post<any>(apiUrl, model, this.getRequestHeader());
  }
  register(model: RegisterModel): Observable<any> {
    let apiUrl = `${this.localUrl}/auth/register`;
    return this.http.post<any>(apiUrl, model, this.getRequestHeader());
  }

  private getRequestHeader(): {
    headers: HttpHeaders | { [header: string]: string | string[]; }
  } {

    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      //withCredentials: true,
      observe: 'response'
    };
    return headers;
  }

  private getRequestHeaderWithToken(): {
    headers: HttpHeaders | { [header: string]: string | string[]; }
  } {

    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      //withCredentials: true,
      observe: 'response'
    };

    return headers;
  }

}
