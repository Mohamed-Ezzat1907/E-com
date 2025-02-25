import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/Iproduct';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  isLoading: boolean = true;

  products: IProduct[] = [];

  getProductsdata(): void {
    this.productsService.getAllproducts().subscribe({
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

  ngOnInit(): void {
    this.getProductsdata();
  }
}
