import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map,take } from 'rxjs/operators';
import { Product } from './shared/models/product';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...(a.payload.val() as Product) }))
        )
      );
  }

  getOne(productId): Observable<Product> {
    return this.db.object<Product>('/products/' + productId).valueChanges().pipe(take(1));
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
