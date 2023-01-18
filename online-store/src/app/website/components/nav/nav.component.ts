import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  faBars,
  faCartShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TokenService } from './../../../services/token.service';

import { User } from '../../../models/user.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  faBars = faBars;
  faCartShopping = faCartShopping;
  faUser = faUser;
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private TokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe((user) => {
      this.profile = user;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  createUser() {
    this.usersService
      .createUser({
        name: 'Adri',
        email: 'adri@mail.com',
        password: '123456',
        role: 'admin',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  login() {
    this.authService.login('adri@mail.com', '123456').subscribe(() => {
      this.getProfile();
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

  getProfile() {
    this.authService.user$.subscribe((user) => {
      this.profile = user;
    });
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
