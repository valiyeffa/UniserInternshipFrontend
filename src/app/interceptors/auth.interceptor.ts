import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const authService = inject(AuthService);

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((err) => {

      if (err.status === 401 && refreshToken) {

        return authService.refreshToken(refreshToken).pipe(

          switchMap((res: any) => {

            if (!res || !res.token) {
              localStorage.clear();
              return throwError(() => err);
            }

            const newToken = res.token;

            localStorage.setItem('token', newToken);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });

            return next(retryReq);
          }),

          catchError(() => {
            localStorage.clear();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => err);
    })
  );
};