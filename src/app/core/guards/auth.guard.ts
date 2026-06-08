import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.getToken()) {
    router.navigate(['/login']);
    return false;
  }

  if (auth.isTokenExpired()) {
    return auth.refreshToken().pipe(
      map(() => true),
      catchError(() => {
        auth.logout();
        return of(false);
      })
    );
  }
  
  return true;
};
