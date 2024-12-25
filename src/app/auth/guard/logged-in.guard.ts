import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../../api.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const apiService = inject(ApiService);

  if (!apiService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/books']);
    return false;
  }
};
