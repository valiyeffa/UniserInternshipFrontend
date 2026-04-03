import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  loginData(data: LoginForm): Observable<any> {
    return this.http.post('/api/Auth/login', data);
  }

  logout() {
    return this.http.get('/api/Auth/logout');
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post('/api/Auth/RefreshTokenLogin', token);
  }
}
