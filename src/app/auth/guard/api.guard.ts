import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../../api.service';

export const apiGuard: CanActivateFn = (): boolean => {
  const router = inject(Router);
  const http = inject(ApiService);

  if (http.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
