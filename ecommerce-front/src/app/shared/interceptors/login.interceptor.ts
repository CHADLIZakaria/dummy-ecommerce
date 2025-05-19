import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  let token = ''
  try {
     token = localStorage.getItem('token') ?? ''
  }
  catch(e) {
    
  }
  if(token) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    })

  }
  return next(req);
};
