import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { Iwish } from '../../../shared/interfaces/iwish';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PlatFormService } from '../../../core/services/plateform/plateform.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  imports: [CarouselModule, CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly platFormService = inject(PlatFormService);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 1,
    nav: false,
  };

  WishDetails: Iwish = {} as Iwish;
  buttonColors: { [id: string]: string } = {};

  subAddWishList: Subscription = new Subscription();
  subRemoveWishList: Subscription = new Subscription();

  ngOnInit(): void {
    this.getWishList();

    if (this.platFormService.checkPlateForm()) {
      const savedColors = localStorage.getItem('buttonColors');
      this.buttonColors = savedColors ? JSON.parse(savedColors) : {};
    }
  }

  getWishList(): void {
    this.wishListService.getWishList().subscribe({
      next: (res) => {
        this.WishDetails = res;
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

  addItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Cart Operation!');
        }
      },
    });
  }

  remover(id: string): void {
    this.wishListService.removeFromWishList(id).subscribe({
      next: (res) => {
        if (this.buttonColors[id] === 'red') {
          this.removeWishList(id);
          this.toastrService.success(res.message, 'Cart Operation!');
        } else {
          this.addWishlist(id);
        }

        this.getWishList();
      },
    });
  }
}
