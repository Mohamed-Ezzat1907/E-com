import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../../interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn, Subscription } from 'rxjs';
import { trigger, transition, useAnimation } from '@angular/animations';
import { wobble } from 'ngx-animate';
import { CurrencyPipe } from '@angular/common';
import { WishListService } from '../../../../core/services/wishList/wish-list.service';
import { PlatFormService } from '../../../../core/services/plateform/plateform.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [
    trigger('wobble', [
      transition(
        '* => *',
        useAnimation(wobble, {
          // Set the duration to 5seconds and delay to 2seconds
          params: { timing: 5, delay: 2 },
        })
      ),
    ]),
  ],
})
export class CardComponent implements OnDestroy, OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishListService = inject(WishListService);
  private readonly platFormService = inject(PlatFormService);

  buttonColors: { [id: string]: string } = {};
  wobble: any;
  product = input<IProduct>();
  subAddProductToCart: Subscription = new Subscription();
  subAddWishList: Subscription = new Subscription();
  subRemoveWishList: Subscription = new Subscription();

  ngOnInit() {
    if (this.platFormService.checkPlateForm()) {
      const savedColors = localStorage.getItem('buttonColors');
      this.buttonColors = savedColors ? JSON.parse(savedColors) : {};
    }
  }

  // add to cart
  addItemToCart(id: string): void {
    this.subAddProductToCart = this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Cart Operation!');
          console.log(res);
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // add to wishList
  addWishlist(id: string): void {
    this.subAddWishList = this.wishListService.addToWishList(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.buttonColors[id] = 'red';
          localStorage.setItem(
            'buttonColors',
            JSON.stringify(this.buttonColors)
          );
          this.toastrService.success(res.message, 'Wish List Operation!');
        }
      },
    });
  }

  // remove from wishList
  removeWishList(id: string): void {
    this.subRemoveWishList = this.wishListService
      .removeFromWishList(id)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.buttonColors[id] = 'grey';
            localStorage.setItem(
              'buttonColors',
              JSON.stringify(this.buttonColors)
            );
            this.toastrService.info(res.message, 'Wish List Operation!');
          }
        },
      });
  }

  toggleWishlist(id: string): void {
    if (this.buttonColors[id] === 'red') {
      this.removeWishList(id);
    } else {
      this.addWishlist(id);
    }
  }

  ngOnDestroy(): void {
    this.subAddProductToCart.unsubscribe();
    this.subAddWishList.unsubscribe();
  }
}
