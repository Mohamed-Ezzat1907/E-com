import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatFormService } from '../services/plateform/plateform.service';

export const authGuard: CanActivateFn = (route, state) => {
  let platFormService = inject(PlatFormService);

  let router = inject(Router);

  if (platFormService.checkPlateForm()) {
    if (localStorage.getItem('userToken') != null) {
      return true;
    }
  }

  router.navigate(['/login']);
  return false;
};
