import { inject, Injectable, signal } from '@angular/core';
import { BrandWithProduct, Category, CategoryWithProduct, EcomPagination, EcomResponse, Product } from '../../../shared/model/ecom.model';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { initProductFilter, ProductFilter } from '../models/home.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeServices {
  private http = inject(HttpClient);

  getCategories(): Observable<EcomResponse<EcomPagination<Category[]>>> {
    return this.http.get<EcomResponse<EcomPagination<Category[]>>>(`${environment.baseUrl}categories?size=30`)
  }

  categoriesWithProductSize = signal<number>(10)
  categoryKeyword = signal<string>('')
  brandKeyword = signal<string>('')
  //products filter
  productFilter = signal<ProductFilter>(initProductFilter)

  categoriesWithNumberProductResource = httpResource<EcomResponse<EcomPagination<CategoryWithProduct[]>>>(
    () => `${environment.baseUrl}categories/search-with-products?size=${this.categoriesWithProductSize()}&keyword=${this.categoryKeyword()}`
  )
  brandsWithNumberProductsResource = httpResource<EcomResponse<EcomPagination<BrandWithProduct[]>>>(
    () => `${environment.baseUrl}brands/search-with-products?size=10&keyword=${this.brandKeyword()}`
  )
  productsResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => `${environment.baseUrl}products?size=${this.productFilter().size}&keyword=${this.productFilter().keyword}&idsCategory=${this.productFilter().idsCategory}&idsBrand=${this.productFilter().idsBrand}&minPrice=${this.productFilter().minPrice}&maxPrice=${this.productFilter().maxPrice}`
  )
  
}
