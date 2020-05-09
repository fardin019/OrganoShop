import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AppUser } from '../shared/models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  ShoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService) {  }

  logout() {
    this.auth.logout();
  }
   async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.cartService.getCart();
  }

}
 