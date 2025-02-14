import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategorie } from '../../shared/interfaces/icategorie';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CardComponent } from '../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);

  private readonly categoriesService = inject(CategoriesService);

  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 1000,
    navText: [
      '<i class="fa-solid fa-circle-left text-mainColor"></i>',
      '<i class="fa-solid fa-circle-right  text-mainColor"></i>',
    ],
    items: 1,
    nav: true,
  };

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
    navText: [
      '<i class="fa-solid fa-circle-left text-mainColor"></i>',
      '<i class="fa-solid fa-circle-right  text-mainColor"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  isLoading: boolean = true;

  subProducts: Subscription = new Subscription();

  subCategories: Subscription = new Subscription();

  products: IProduct[] = [];

  categories: Icategorie[] = [];

  getProductsdata(): void {
    this.subProducts = this.productsService.getAllproducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.products = res.data;
      },

      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  getCategoriesdata(): void {
    this.subCategories = this.categoriesService.getAllcategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getProductsdata();

    this.getCategoriesdata();
  }

  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
    this.subCategories.unsubscribe();
  }
}
