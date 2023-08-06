import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, delay, throwError, retry, tap } from 'rxjs';
import { Product } from '../models/product';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products: Array<Product> = [];

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAll(): Observable<Array<Product>> {
    return this.http
      .get<Array<Product>>('https://fakestoreapi.com/products', {
        params: new HttpParams({ fromObject: { limit: 5 } }),
      })
      .pipe(
        delay(1000),
        retry(2),
        tap((products) => (this.products = products)),
        catchError(this.errorHandler.bind(this))
      );
  }

  create(product: Product): Observable<Product> {
    return this.http
      .post<Product>('https://fakestoreapi.com/products', product)
      .pipe(tap((product) => this.products.push(product)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
