import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const refreshToken: any = localStorage.getItem('refreshToken');
  const authService = inject(AuthService);

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(authReq).pipe(
    catchError((err, caught) => {
      if (err.statusCode.includes(401)) {
        return authService.refreshToken(refreshToken).pipe(
          switchMap((res: any) => {
            const newToken = res.data.token;
            localStorage.setItem('token', newToken);
            
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(retryReq);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
