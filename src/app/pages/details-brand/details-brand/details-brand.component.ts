import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Ibrand } from '../../../shared/interfaces/ibrand';

@Component({
  selector: 'app-details-brand',
  imports: [],

  templateUrl: './details-brand.component.html',
  styleUrl: './details-brand.component.scss',
})
export class DetailsBrandComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly brandsService = inject(BrandsService);

  detailsBrand: Ibrand = {} as Ibrand;
  subDetails: Subscription = new Subscription();

  ngOnInit(): void {
    this.call();
  }

  call(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        let idBrand = res.get('id');

        this.subDetails = this.brandsService
          .getSpecificBrand(idBrand!)
          .subscribe({
            next: (res) => {
              this.detailsBrand = res.data;
            },
          });
      },
    });
  }
  ngOnDestroy(): void {
    this.subDetails.unsubscribe();
  }
}
