import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const decoded: any = jwtDecode(token);

    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      if (!refreshToken) {
        localStorage.removeItem('token');
        return router.createUrlTree(['/login']);
      }

      return authService.refreshToken(refreshToken).pipe(
        map((res: any) => {
          if (!res?.token) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return router.createUrlTree(['/login']);
          }

          localStorage.setItem('token', res.token);
          return true;
        }),
        catchError(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          return of(router.createUrlTree(['/login']));
        })
      );
    }

    return true;

  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return router.createUrlTree(['/login']);
  }
};