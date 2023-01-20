import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  private buildForm(): void {
    // new FormControl(defaultValue, syncValidators, asyncValidators) -> [defaultValue, syncValidators, asyncValidators]
    /** Validators:
     * min -> minimo (number, date)
     * > static min(min: number): ValidatorFn
     * max -> maximo (number, date)
     * > static max(max: number): ValidatorFn
     * required -> requerido
     * > static required(control: AbstractControl): ValidationErrors | null
     * requiredTrue -> requerido true (checkbox)
     * > static requiredTrue(control: AbstractControl): ValidationErrors | null
     * email -> email
     * > static email(control: AbstractControl): ValidationErrors | null
     * minLength -> minimo de caracteres (string)
     * > static minLength(minLength: number): ValidatorFn
     * maxLength -> maximo de caracteres (string)
     * > static maxLength(maxLength: number): ValidatorFn
     * pattern -> patron
     * > static pattern(pattern: string | RegExp): ValidatorFn
     * nullValidator -> validador nulo (no valida nada)
     * > static nullValidator(control: AbstractControl): ValidationErrors | null
     * compose -> compone validadores síncronos
     * > static compose(validators: ValidatorFn[]): ValidatorFn | null
     * composeAsync -> compone validadores asíncronos
     * > static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
     */
    this.form = this.formBuilder.group({
      fullname: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        last: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000000'],
      number: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      date: [''],
      month: [''],
      week: [''],
      range: [''],
      dateLocal: [''],
      search: [''],
      category: [''],
      tag: [''],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
      zone: [''],
    });
  }

  ngOnInit(): void {
    // Podemos suscribirnos a los cambios de un campo en particular
    /*this.nameField.valueChanges.subscribe((value) => {
      console.log(value);
    });*/
    // O a todos los cambios del formulario
    /*this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });*/
  }

  get nameField() {
    return this.form.get('fullname.name');
  }

  get lastField() {
    return this.form.get('fullname.last');
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get numberField() {
    return this.form.get('number');
  }

  get dateField() {
    return this.form.get('date');
  }

  get monthField() {
    return this.form.get('month');
  }

  get weekField() {
    return this.form.get('week');
  }

  get rangeField() {
    return this.form.get('range');
  }

  get dateLocalField() {
    return this.form.get('dateLocal');
  }

  get searchField() {
    return this.form.get('search');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get zoneField() {
    return this.form.get('zone');
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  get isNameValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  get isPhoneValid() {
    return this.phoneField.touched && this.phoneField.valid;
  }

  get isPhoneInvalid() {
    return this.phoneField.touched && this.phoneField.invalid;
  }

  save(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
