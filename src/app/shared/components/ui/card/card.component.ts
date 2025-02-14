import { Component, inject, input, OnDestroy } from '@angular/core';
import { IProduct } from '../../../interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnDestroy {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  product = input<IProduct>();
  subAddProductToCart: Subscription = new Subscription();

  addItemToCart(id: string): void {
    this.subAddProductToCart = this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Cart Operation!');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subAddProductToCart.unsubscribe();
  }
}
