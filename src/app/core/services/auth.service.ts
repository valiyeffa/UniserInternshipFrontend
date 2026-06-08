import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { ToastService } from './toast.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiration: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  status: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_KEY = 'auth_refresh_token';
  private readonly USER_KEY = 'auth_user';

  constructor(private http: HttpClient, private router: Router , private toast: ToastService) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.apiUrl}/api/Auth/login`, data
    ).pipe(
      map(response => response.data),
      tap(loginData => {
        localStorage.setItem(this.TOKEN_KEY, loginData.token);
        localStorage.setItem(this.REFRESH_KEY, loginData.refreshToken);
        localStorage.setItem(this.USER_KEY, JSON.stringify({ username: data.username }));
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
  const refreshToken = localStorage.getItem(this.REFRESH_KEY);
  if (!refreshToken) {
    return throwError(() => new Error('No refresh token'));
  }
  return this.http.post<ApiResponse<LoginResponse>>(
    `${this.apiUrl}/api/Auth/RefreshTokenLogin`,
    { refreshToken }
  ).pipe(
    map(response => response.data),
    tap(loginData => {
      localStorage.setItem(this.TOKEN_KEY, loginData.token);
      localStorage.setItem(this.REFRESH_KEY, loginData.refreshToken);
    })
  );
}

  getRefreshToken(): string | null {
  return localStorage.getItem(this.REFRESH_KEY);
}
  isTokenExpired(): boolean {
  const token = this.getToken();
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; 
    return Date.now() > expiry;
  } catch {
    return true; 
  }
}

verifyToken(): Observable<boolean> {
  return this.http.get<any>(
    `${this.apiUrl}/api/Global/GetModules`
  ).pipe(
    map(() => true),      
    catchError(() => of(false)) 
  );
}

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): { username: string } | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}