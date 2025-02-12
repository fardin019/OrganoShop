import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingCartItem } from '../shared/models/shopping-cart-item';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product: Product;
  @Input('show-actions') showAction = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
