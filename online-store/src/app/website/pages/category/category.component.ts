import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadMore();
    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
  }

  loadMore() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          if (params.get('id') !== this.categoryId) {
            this.products = [];
            this.offset = 0;
          }
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getProductsByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((products) => {
        this.products = this.products.concat(products);
        this.offset += this.limit;
      });
  }
}
