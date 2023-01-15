import { Component, OnInit } from '@angular/core';

import { faBurger, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  faBurger = faBurger;
  faCartShopping = faCartShopping;
  activeMenu = false;
  counter = 0;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
