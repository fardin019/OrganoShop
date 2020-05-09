import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'app/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular7-data-table';





@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product [] = [];
  itemCount: number;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.subscription = this.productService.getAll().
    subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });

    
   }

   private initializeTable(products: Product []) {
     this.tableResource = new DataTableResource(products);
     this.tableResource.query({ offset: 0, limit: 10})
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
   }

   reloadItems(params) {
     if (!this.tableResource) return;

    this.tableResource.query(params)
    .then(items => this.items = items);
   }

   delete(productId) {
    if (!confirm('Are you sure you want to delete this')) return;

    this.productService.delete(productId);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
