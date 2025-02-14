import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatFormService } from '../services/plateform/plateform.service';

export const logoutGuard: CanActivateFn = (route, state) => {
  let platFormService = inject(PlatFormService);

  let router = inject(Router);

  if (platFormService.checkPlateForm()) {
    if (localStorage.getItem('userToken') != null) {
      router.navigate(['/home']);
      return false;
    }
  }

  return true;
};
