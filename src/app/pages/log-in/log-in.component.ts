import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  msgError: string = '';

  msgSuccess: string = '';

  isLoading: boolean = false;

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
    ]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginform(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;

          if (res.message === 'success') {
            this.msgSuccess = res.message;

            this.msgError = '';

            setTimeout(() => {
              localStorage.setItem('userToken', res.token);

              this.authService.saveData();
              console.log(this.authService.saveData());

              this.router.navigate(['/home']);
            }, 500);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;

          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  confirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }
}
