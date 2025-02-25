import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ThemeService } from '../../core/services/theme/theme.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);
  readonly authService = inject(AuthService);
  readonly cartService = inject(CartService);

  isLogin = input<boolean>(true);
  theme: string = 'light';
  countNumber: Signal<number> = computed(() => this.cartService.cartNumber());

  constructor(private themeService: ThemeService) {
    if (isPlatformBrowser(this.platformId)) {
      this.theme = localStorage.getItem('theme') || 'light';
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken')) {
        this.cartService.getUserCart().subscribe({
          next: (res) => {
            this.cartService.cartNumber.set(res.numOfCartItems);
          },
        });
      }
    }
  }

  // ngAfterViewInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     if (localStorage.getItem('userToken')) {
  //       this.cartService.getUserCart().subscribe({
  //         next: (res) => {
  //           this.cartService.cartNumber.set(res.numOfCartItems);
  //         },
  //       });
  //     }
  //   }
  // }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.themeService.toggleTheme();
      this.theme = localStorage.getItem('theme') || 'light';
    }
  }
}
