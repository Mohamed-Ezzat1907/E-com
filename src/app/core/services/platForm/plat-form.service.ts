import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatFormService {
  constructor(@Inject(PLATFORM_ID) private PLATFORM_ID: object) {}

  checkPaltform(): boolean {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      return true;
    } else {
      return false;
    }
  }
}
