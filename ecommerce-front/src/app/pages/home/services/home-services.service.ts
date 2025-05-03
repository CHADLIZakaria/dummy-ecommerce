import { inject, Injectable, signal } from '@angular/core';
import { BrandWithProduct, Category, CategoryWithProduct, EcomPagination, EcomResponse, Product } from '../../../shared/model/ecom.model';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServices {
  private baseUrl = "http://localhost:8080/"

  private http = inject(HttpClient);

  getCategories(): Observable<EcomResponse<EcomPagination<Category[]>>> {
    return this.http.get<EcomResponse<EcomPagination<Category[]>>>(`${this.baseUrl}categories?size=0`)
  }

  categoriesWithProductSize = signal<number>(10)
  categoryKeyword = signal<string>('')
  brandKeyword = signal<string>('')
  productKeyword = signal<string>('')
  idsCategory = signal<string>('')
  categoriesWithNumberProductResource = httpResource<EcomResponse<EcomPagination<CategoryWithProduct[]>>>(
    () => `${this.baseUrl}categories/search-with-products?size=${this.categoriesWithProductSize()}&keyword=${this.categoryKeyword()}`
  )
  brandsWithNumberProductsResource = httpResource<EcomResponse<EcomPagination<BrandWithProduct[]>>>(
    () => `${this.baseUrl}brands/search-with-products?size=10&keyword=${this.brandKeyword()}`
  )
  productsResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => `${this.baseUrl}products?size=10&keyword=${this.productKeyword()}&idsCategory=${this.idsCategory()}`
  )
  
}
