import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastrService = inject(ToastrService);

  idCart: string = localStorage.getItem('cartId')!;
  isLoading: boolean = false;

  // ngOnInit(): void {
  //   this.catId();
  // }
  // catId(): void {
  //   this.activatedRoute.paramMap.subscribe((param) => {
  //     this.idCart = param.get('id')!;
  //   });
  // }

  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  submitForm(): void {
    this.ordersService
      .onLinePay(this.idCart, this.checkoutForm.value)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastrService.success('Complete the Payment Process');
            window.open(res.session.url, '_self');
          }
        },
      });
  }
}
