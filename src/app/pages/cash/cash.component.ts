import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cash',
  imports: [ReactiveFormsModule],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.scss',
})
export class CashComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly toastrService = inject(ToastrService);

  idCart: string = localStorage.getItem('cartId')!;
  isLoading: boolean = false;

  cashForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  submitForm(): void {
    this.ordersService.cashPay(this.idCart, this.cashForm.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(
            res.data.totalOrderPrice,
            'Payment Operation'
          );
        }
      },
    });
  }
}
