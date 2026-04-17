import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const decoded: any = jwtDecode(token);

    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return router.createUrlTree(['/login']);
    }

    return true;

  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return router.createUrlTree(['/login']);
  }
};