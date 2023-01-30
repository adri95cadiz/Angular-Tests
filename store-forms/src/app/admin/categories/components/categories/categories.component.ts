import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categories$ = this.categoriesService.getAllCategories();
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe((rta) => {
      console.log(rta);
      this.fetchCategories();
    });
  }

}
