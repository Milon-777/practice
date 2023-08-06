import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  title = 'angular app';
  // products: Array<Product> = [];
  loading = false;
  // products$: Observable<Array<Product>>;
  term = '';

  constructor(
    public productService: ProductService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    //   this.products$ = this.productService
    //     .getAll()
    //     .pipe(tap(() => (this.loading = false)));
    // }
    this.productService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
