import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from './../../environments/environment';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl).pipe(retry(3));
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http
      .get<Product[]>(this.apiUrl, {
        params: {
          limit: limit.toString(),
          offset: offset.toString(),
        },
        context: checkTime(),
      })
      .pipe(
        retry(3),
        map((products) => {
          return products.map((product) => {
            return {
              ...product,
              taxes: 0.19 * product.price,
            };
          });
        })
      );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        /** Errores:
         *    500: Internal Server Error,
         *    409: Conflict,
         *    404: Not Found,
         *    403: Forbidden,
         *    401: Unauthorized,
         *    400: Bad Request
         *  */
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError(() => 'Internal Server Error');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'Product not found');
        }
        return throwError(() => error);
      })
    );
  }

  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  updateProduct(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
