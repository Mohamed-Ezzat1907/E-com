import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatFormService } from '../../services/platForm/plat-form.service';

export const authGuard: CanActivateFn = (route, state) => {
  let platformServer = inject(PlatFormService);

  let router = inject(Router);

  if (platformServer.checkPaltform()) {
    if (localStorage.getItem('userToken') != null) {
      return true;
    }
  }

  router.navigate(['/login']);
  return true;
};
