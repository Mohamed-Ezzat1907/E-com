import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);

  step: number = 1;
  isLoading: boolean = false;
  // step 1
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  // step 2
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{6}$/),
    ]),
  });

  // step 3
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
    ]),
  });

  verifyEmailSubmit(): void {
    this.authService.forgotPassword(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);

        if (res.statusMsg === 'success') {
          this.step = 2;
          this.toastrService.info(res.message, 'Reset Password');
          let userEmail = this.verifyEmail.get('email')?.value;
          this.resetPassword.get('email')?.patchValue(userEmail);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  verifyCodeSubmit(): void {
    this.authService.verifyResetCode(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3;
          this.toastrService.info(res.status, 'Reset Password');
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ResetPasswordSubmit(): void {
    this.authService.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Password reset succeeded');
        localStorage.setItem('userToken', res.token);
        this.authService.saveUserData();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
