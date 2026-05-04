import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'https://eurasia-dev.program.az/Eurasia/system/api';
  const apiContractUrl = 'https://eurasia-dev.program.az/contracts/api';
  let baseUrl = '';

  if (req.url.startsWith('/Global')) {
    baseUrl = apiUrl;
  } else if (req.url.startsWith('/Contracts')) {
    baseUrl = apiContractUrl;
  }

  const newReq = req.clone({
    url: baseUrl + req.url
  });

  return next(newReq);
};
