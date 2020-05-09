import { Component, Input } from '@angular/core';
import { CategoryService } from 'app/category.service';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent {
  category$;

  @Input('category') category;

  constructor(categoryService: CategoryService) {
    this.category$ = categoryService.getAll();
   }


}
