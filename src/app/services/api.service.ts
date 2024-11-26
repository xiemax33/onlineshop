import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://fakestoreapi.com';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token =  this.authService.getCurrentToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  
  getAll(endpoint:string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/' + endpoint);
  }
  
  getId(endpoint: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders()});
  }

  deleteData(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders()});
  }

  update(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${endpoint}`, data);
  }
}