import { inject, Injectable, signal } from '@angular/core';
import { Category, EcomPagination, EcomResponse, Product } from '../../../shared/model/ecom.model';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandWithProduct, CategoryWithProduct, initBrandWithProduct, initCategoryWithProduct, initProductFilter, initRangePrice, ProductFilter } from '../models/home.model';
import { environment } from '../../../../environments/environment.development';
import { debouncedSignal } from '../../../shared/helper/ecomHelper';

@Injectable({
  providedIn: 'root'
})
export class HomeServices {
  private http = inject(HttpClient);

  getCategories(): Observable<EcomResponse<EcomPagination<Category[]>>> {
    return this.http.get<EcomResponse<EcomPagination<Category[]>>>(`${environment.baseUrl}categories?size=30`)
  }

  brandKeyword = signal<string>('')
  brandsWithProductSize = signal<number>(10)
  
  categoryKeyword = signal<string>('')
  categoriesWithProductSize = signal<number>(10)
  //products filter
  productFilter = signal<ProductFilter>(initProductFilter)
  productFilterDebounced = debouncedSignal(this.productFilter, 200, initProductFilter)
  

  categoriesWithNumberProductResource = httpResource<EcomResponse<EcomPagination<CategoryWithProduct[]>>>(
    () => ({
      url: `${environment.baseUrl}categories/search-with-products`,
      params: {
        'size': this.categoriesWithProductSize(),
        'keyword': this.categoryKeyword(),
      }    
    }),
    {defaultValue: initCategoryWithProduct}
  )
  brandsWithNumberProductsResource = httpResource<EcomResponse<EcomPagination<BrandWithProduct[]>>>(
    () => ({
      url:`${environment.baseUrl}brands/search-with-products`,
      params: {
        'size': this.brandsWithProductSize(),
        'keyword': this.brandKeyword()
      }
    }),    
    {defaultValue: initBrandWithProduct}
  )
  rangePriceResource = httpResource<EcomResponse<{minPrice: number, maxPrice: number}>>(
    () =>({
      url: `${environment.baseUrl}products/getRangePrice`,
      params: {     
        'size': this.productFilterDebounced().size,
        'name__like': this.productFilterDebounced().keyword,
        'brand.id__in': this.productFilterDebounced().idsBrand,
        'category.id__in': this.productFilterDebounced().idsCategory
      }
    }),
    {defaultValue: initRangePrice}
  )
  productsResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => ({
      url: `${environment.baseUrl}products`,
      params: {
        size: this.productFilter().size,
        'name__like': this.productFilter().keyword,
        'brand.id__in': this.productFilter().idsBrand,
        'category.id__in': this.productFilter().idsCategory,
        'price__gte': this.productFilter().minPrice,
        'price__lte': this.productFilter().maxPrice,        
      }
    })
  )
  
}
