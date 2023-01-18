import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${environment.API_URL}/api/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
