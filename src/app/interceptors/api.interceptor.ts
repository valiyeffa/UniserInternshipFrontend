import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = 'https://eurasia-dev.program.az/Eurasia/system/api';
  const apiContractUrl = 'https://eurasia-dev.program.az/contracts/api';
  const apiOperationsUrl = 'https://eurasia-dev.program.az/operations/api';
  const apiCommonUrl = 'https://eurasia-dev.program.az/common/api';
  let baseUrl = '';

  if (req.url.startsWith('/Global') || req.url.startsWith('/Auth')) {
    baseUrl = apiUrl;
  } else if (req.url.startsWith('/Contracts')) {
    baseUrl = apiContractUrl;
  } else if (req.url.startsWith('/Orders')) {
    baseUrl = apiOperationsUrl;
  } else if (req.url.startsWith('/ComboBox') || req.url.startsWith('/AutoComplete')) {
    baseUrl = apiCommonUrl;
  }

  const newReq = req.clone({
    url: baseUrl + req.url
  });

  return next(newReq);
};
