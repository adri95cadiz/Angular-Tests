import { Component, Input, Output, EventEmitter } from '@angular/core';
import { switchMap, zip } from 'rxjs';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../../models/product.model';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() loadMoreProducts = new EventEmitter();
  showProductDetail = false;
  productChosen: Product = {} as Product;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.showProductDetail = true;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  readAndUpdate(id: string) {
    // Example 1: Avoid nested subscribe, use switchMap
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product: Product) => {
          return this.productsService.updateProduct(product.id, {
            title: 'change',
          });
        })
      )
      .subscribe((data: Product) => {
        console.log(data);
      });

    // Example 2: Make parallel requests, use zip
    zip(
      this.productsService.getProduct(id),
      this.productsService.updateProduct(id, { title: 'change' })
    ).subscribe(([product, updatedProduct]) => {
      console.log(product);
      console.log(updatedProduct);
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'New Product',
      price: 1000,
      description: 'New Product Description',
      images: ['https://picsum.photos/200/300'],
      categoryId: 1,
    };
    this.productsService.createProduct(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'New title',
    };
    const id = this.productChosen.id;
    this.productsService.updateProduct(id, changes).subscribe((data) => {
      this.productChosen = data;
      const index = this.products.findIndex((p) => p.id === id);
      this.products[index] = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.deleteProduct(id).subscribe((data) => {
      if (data) {
        const index = this.products.findIndex((p) => p.id === id);
        this.products.splice(index, 1);
        this.showProductDetail = false;
      }
    });
  }

  loadMore() {
    this.loadMoreProducts.emit();
  }
}
