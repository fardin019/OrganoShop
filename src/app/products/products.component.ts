import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];

  category$;
  category: string;
  subscription: Subscription;
  cart$: Observable<ShoppingCart>;
  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute, 
    private cartService: ShoppingCartService) { }
  // constructor(
  //   route: ActivatedRoute,
  //   productService: ProductService,
  //   private cartService: ShoppingCartService) {

  //   productService
  //   .getAll()
  //   .switchMap(products => {
  //     this.products = products;
  //     return route.queryParamMap;
  //   })
  //     .subscribe(params => {
  //       this.category = params.get('category');

  //       this.filteredProducts = (this.category) ?
  //         this.products.filter(p => p.category === this.category) :
  //         this.products;
  //     });
  // }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    // this.subscription = (await this.cartService.getCart())
    //     .valueChanges()
    //     .subscribe((cart) => (this.cart = cart));
    this.populateProducts();
}

private populateProducts() {
  this.productService.getAll()
  .pipe(
    switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
  )
  .subscribe(params => {
    this.category = params.get('category');
    this.applyFilter();
  });
}

private applyFilter() {
  this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
}

ngOnDestroy() {
  // this.subscription.unsubscribe();
}
}
