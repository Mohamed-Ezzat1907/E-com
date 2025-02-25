import { Inject, Injectable, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'theme';
  private isBrowser: boolean;

  constructor(@Optional() @Inject(PLATFORM_ID) private platformId?: object) {
    this.isBrowser = platformId ? isPlatformBrowser(platformId) : false;

    if (this.isBrowser) {
      this.loadTheme();
    }
  }

  toggleTheme(): void {
    if (!this.isBrowser) return;

    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.toggle('dark');

    localStorage.setItem(this.themeKey, isDarkMode ? 'dark' : 'light');
  }

  private loadTheme(): void {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }
}
