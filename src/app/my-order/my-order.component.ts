import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  order$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
      this.order$ = this.authService.user$.switchMap(user => this.orderService.getOrderById(user.uid));
    }

  ngOnInit() {
    
  }
}
