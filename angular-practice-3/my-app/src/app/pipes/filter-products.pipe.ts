import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: Array<Product>, search: string): Array<Product> {
    if (search.length === 0) return products;
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}
