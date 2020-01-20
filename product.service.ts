import { Injectable } from '@angular/core';
import { Product } from './product';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Injectable()
export class ProductService {
   product= new Product("Red Bull", "Red Bull", "Energy Drink", 3)
   product2 = new Product("Ice Tea", "Lipton", "Energy Drink", 2)
   products = new Array(
      this.product,
      this.product2
   )
   constructor() {}

   getAllProducts():Array<Product> {
      return this.products
   }
}
