import { Component, OnInit } from '@angular/core';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {} as Product;
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
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
    this.productsService.getProduct(id).subscribe((data) => {
      this.productChosen = data;
      this.toggleProductDetail();
      this.statusDetail = 'success';
    }, (error) => {
      console.log(error);
      this.statusDetail = 'error';
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
    this.productsService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
