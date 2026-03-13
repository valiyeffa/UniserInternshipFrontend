import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'https://eurasia-dev.program.az/Eurasia/system';

  const newReq = req.clone({
    url: apiUrl + req.url
  });

  return next(newReq);
};
