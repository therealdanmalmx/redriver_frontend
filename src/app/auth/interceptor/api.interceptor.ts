import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    try {
      const parsedToken = JSON.parse(storedToken);
      const token = parsedToken.data;

      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Failed to parse token from localStorage:', error);
    }
  }
  return next(req);
};
