import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

import { Category } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services/categories.service';
import { MyValidators } from '../../../../utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required, MyValidators.validCategoryName(this.categoriesService)],
      image: ['', Validators.required],
    });
  }

  get nameField() {
    return this.categoryForm.get('name');
  }

  get imageField() {
    return this.categoryForm.get('image');
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      this.createCategory();
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  private createCategory() {
    const category: Partial<Category> = this.categoryForm.value;
    this.categoriesService.createCategory(category).subscribe((newCategory) => {
      console.log(newCategory);
      this.router.navigate(['./admin/categories']);
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe((url) => {
          this.imageField.setValue(url);
        });
      })
    )
    .subscribe((snapshot) => {
      console.log(snapshot);
    });
  }

}
