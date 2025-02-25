import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ICart } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],

  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
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

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly productsService = inject(ProductsService);

  detailsProduct: IProduct = {} as IProduct;
  cartDetails: ICart = {} as ICart;

  subDetails: Subscription = new Subscription();

  ngOnInit(): void {
    this.call();
    this.getCart();
  }

  call(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        let idProduct = res.get('id');

        this.subDetails = this.productsService
          .getSpecificProduct(idProduct!)
          .subscribe({
            next: (res) => {
              this.detailsProduct = res.data;
            },
          });
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

  getCart(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
    });
  }

  ngOnDestroy(): void {
    this.subDetails.unsubscribe();
  }
}
