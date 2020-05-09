import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../shared/models/order';
import { Router } from '@angular/router';
import { Shipping } from '../shared/models/shipping';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping = new Shipping();
  userId: string;
  userSubscrition: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  async ngOnInit() {
    this.userSubscrition = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscrition.unsubscribe();
  }

}
