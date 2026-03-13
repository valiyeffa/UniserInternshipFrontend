import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('loade started!');
  const loaderService = inject(LoaderService);
  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    })
  )
};
