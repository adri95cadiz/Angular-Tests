import { AbstractControl } from '@angular/forms';
import { CategoriesService } from '../core/services/categories.service';
import { map } from 'rxjs/operators';

export class MyValidators {
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if (!containsNumber(value)) {
      return { password_invalid: true };
    }
    return null;
  }

  static passwordsMatch(control: AbstractControl) {
    const password = control.value.password;
    const confirmPassword = control.value.confirmPassword;
    if (password !== confirmPassword) {
      return { passwords_do_not_match: true };
    }
    return null;
  }

  static validCategoryName(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checkAvailability(value).pipe(
        map((rta) => {
          if (rta) {
            return { category_name_taken: true };
          }
          return null;
        })
      );
    };
  }
}

function containsNumber(value: string): boolean {
  return value.split('').some(isNumber);
}

function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}
