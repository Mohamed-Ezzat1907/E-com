import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icategorie } from '../../../shared/interfaces/icategorie';
import { CategoriesService } from '../../../core/services/categories/categories.service';

@Component({
  selector: 'app-details-cat',
  imports: [],
  templateUrl: './details-cat.component.html',
  styleUrl: './details-cat.component.scss',
})
export class DetailsCatComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService = inject(CategoriesService);

  detailsCat: Icategorie = {} as Icategorie;
  subDetails: Subscription = new Subscription();

  ngOnInit(): void {
    this.call();
  }

  call(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        let idCat = res.get('id');

        this.subDetails = this.categoriesService
          .getSpecificcategories(idCat!)
          .subscribe({
            next: (res) => {
              this.detailsCat = res.data;
            },
          });
      },
    });
  }
  ngOnDestroy(): void {
    this.subDetails.unsubscribe();
  }
}
