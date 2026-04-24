import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService, LoginResponse } from '../services/auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Refresh token da yoxdursa birbaşa logout
        const refreshToken = localStorage.getItem('auth_refresh_token');
        if (!refreshToken) {
          auth.logout();
          return throwError(() => error);
        }
        return handle401(req, next, auth, router);
      }
      return throwError(() => error);
    })
  ) as Observable<any>;
};

function handle401(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  auth: AuthService,
  router: Router
): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return auth.refreshToken().pipe(
      switchMap((res: LoginResponse) => {
        isRefreshing = false;
        refreshTokenSubject.next(res.token);
        const retryReq = req.clone({
          setHeaders: { Authorization: `Bearer ${res.token}` }
        });
        return next(retryReq);
      }),
      catchError(err => {
        isRefreshing = false;
        // localStorage təmizlə və login-ə yönləndir
        localStorage.clear();
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap(token => {
        const retryReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(retryReq);
      })
    );
  }
}