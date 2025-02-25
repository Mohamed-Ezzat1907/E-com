import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  isLogin = input<boolean>(true);

  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);

  logOut(): void {
    localStorage.removeItem('userToken');

    this.authService.userData.next(null);

    this.router.navigate(['/login']);
  }
}
