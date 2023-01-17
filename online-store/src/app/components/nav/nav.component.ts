import { Component, OnInit } from '@angular/core';

import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  faBars = faBars;
  faCartShopping = faCartShopping;
  activeMenu = false;
  counter = 0;
  profile!: User;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
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

  getProfile() {
    this.authService.getProfile().subscribe((user) => {
      this.profile = user;
    });
  }
}
