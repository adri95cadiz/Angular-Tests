import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories`);
  }

  createCategory(data: Partial<Category>) {
    return this.http.post<Category>(`${environment.url_api}/categories`, data);
  }

  updateCategory(id: string, data: Partial<Category>) {
    return this.http.put<Category>(
      `${environment.url_api}/categories/${id}`,
      data
    );
  }

  deleteCategory(id: string) {
    return this.http.delete<Category>(
      `${environment.url_api}/categories/${id}`
    );
  }

  checkAvailability(name: string) {
    return this.http.post(
      `${environment.url_api}/categories/availability`,
      { name }
    );
  }
}
