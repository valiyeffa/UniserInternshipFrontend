import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Token yoxdursa → login
  if (!auth.getToken()) {
    router.navigate(['/login']);
    return false;
  }

  // Token vaxtı bitibsə → API-yə getmə, birbaşa refresh et
  if (auth.isTokenExpired()) {
    return auth.refreshToken().pipe(
      map(() => true),
      catchError(() => {
        auth.logout();
        return of(false);
      })
    );
  }

  // Token var və vaxtı keçməyib → API-yə yoxlama sorğusu
  return auth.verifyToken().pipe(
    map(isValid => {
      if (isValid) return true;
      auth.logout();
      return false;
    }),
    catchError(() => {
      auth.logout();
      return of(false);
    })
  );
};