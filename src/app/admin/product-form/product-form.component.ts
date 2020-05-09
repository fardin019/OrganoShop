import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { ProductService } from 'app/product.service';
import { CategoryService } from 'app/category.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    categoryService: CategoryService, 
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getOne(this.id).subscribe(p => this.product = p);
    
   }

   save(product) {
     if (this.id) this.productService.update(this.id, product);
     else this.productService.create(product);

    this.router.navigate(['/admin/products']);
   }

   delete() {
    if (!confirm('Are you sure you want to delete this')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
