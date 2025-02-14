import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../shared/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';
// import { IProduct } from './../../shared/interfaces/iproduct';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CheckoutComponent],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  cartDetails: ICart = {} as ICart;
  clear: boolean = false;

  pay: number = 0;
  // Product: IProduct = {} as IProduct;
  subGetUserCart: Subscription = new Subscription();
  subRemoveItemFromCart: Subscription = new Subscription();
  subUpdateCartProduct: Subscription = new Subscription();
  subclearCart: Subscription = new Subscription();

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.subGetUserCart = this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this.subRemoveItemFromCart = this.cartService
      .removeItemFromCart(id)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastrService.error(
              'Product has been deleted',
              'Cart Operation'
            );
            this.cartDetails = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateProduct(id: string, count: number) {
    this.subUpdateCartProduct = this.cartService
      .updateCartProduct(id, count)
      .subscribe({
        next: (res) => {
          this.cartDetails = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  clearCart() {
    this.subclearCart = this.cartService.ClearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartDetails = {} as ICart;
          this.clear = true;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subGetUserCart.unsubscribe();
    this.subRemoveItemFromCart.unsubscribe();
    this.subUpdateCartProduct.unsubscribe();
    this.subclearCart.unsubscribe();
  }
}
