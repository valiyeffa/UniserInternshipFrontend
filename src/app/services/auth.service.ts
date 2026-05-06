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
    return this.http.post('/Auth/login', data);
  }

  logout() {
    return this.http.get('/Auth/logout');
  }

  refreshToken(refreshToken: any): Observable<any> {
    return this.http.post('/Auth/RefreshTokenLogin', { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }
}
