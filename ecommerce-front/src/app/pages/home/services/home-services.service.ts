import { inject, Injectable, signal } from '@angular/core';
import { Category, EcomPagination, EcomResponse, FavoriteRespone, Product } from '../../../shared/model/ecom.model';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandWithProduct, CartItem, CategoryWithProduct, initBrandWithProduct, initCategoryWithProduct, initProduct, initProductFilter, initRangePrice, ProductFilter } from '../models/home.model';
import { environment } from '../../../../environments/environment.development';
import { debouncedSignal } from '../../../shared/helper/ecomHelper';

@Injectable({
  providedIn: 'root'
})
export class HomeServices {
  private http = inject(HttpClient);
  brandKeyword = signal<string>('')
  brandsWithProductSize = signal<number>(10)
  
  categoryKeyword = signal<string>('')
  categoriesWithProductSize = signal<number>(10)
  //products filter
  productFilter = signal<ProductFilter>(initProductFilter)
  productFilterDebounced = debouncedSignal(this.productFilter, 200, initProductFilter)

  getCategories(): Observable<EcomResponse<EcomPagination<Category[]>>> {
    return this.http.get<EcomResponse<EcomPagination<Category[]>>>(`${environment.baseUrl}categories?size=30`)
  }

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
        'size': this.productFilterDebounced().size * (this.productFilterDebounced().page+1),
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
        'page': this.productFilter().page,
        'name__like': this.productFilter().keyword,
        'brand.id__in': this.productFilter().idsBrand,
        'category.id__in': this.productFilter().idsCategory,
        'price__gte': this.productFilter().minPrice,
        'price__lte': this.productFilter().maxPrice,
        'sort': this.productFilter().sort      
      }
    }),
    {defaultValue: initProduct}
  )
  
}
