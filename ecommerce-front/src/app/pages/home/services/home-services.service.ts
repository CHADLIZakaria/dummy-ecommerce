import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Category, EcomPagination, EcomResponse, initCategoryPagination, initProduct, Product } from '../../../shared/model/ecom.model';
import { BrandWithProduct, CategoryWithProduct, initBrandWithProduct, initCategoryWithProduct, initProductFilter, initRangePrice, ProductFilter } from '../models/home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeServices {
  // false for all (available and not available)
  isAvailable = signal<boolean>(false);
  brandKeyword = signal<string>('')
  brandsWithProductSize = signal<number>(10)

  categoryKeyword = signal<string>('')
  categoriesWithProductSize = signal<number>(10)
  //products filter
  productFilter = signal<ProductFilter>(initProductFilter)
  //productFilterDebounced = debouncedSignal(this.productFilter, 300, initProductFilter)

  categoriesResource = httpResource<EcomResponse<EcomPagination<Category[]>>>(
    () => ({
      url: `${environment.baseUrl}categories`,
      params: {
        'size': 0,
        'keyword': this.categoryKeyword(),
      }
    }),
    { defaultValue: initCategoryPagination }
  )


  categoriesWithNumberProductResource = httpResource<EcomResponse<EcomPagination<CategoryWithProduct[]>>>(
    () => ({
      url: `${environment.baseUrl}categories/search-with-products`,
      params: {
        'size': this.categoriesWithProductSize(),
        'keyword': this.categoryKeyword(),
      }
    }),
    { defaultValue: initCategoryWithProduct }
  )

  brandsWithNumberProductsResource = httpResource<EcomResponse<EcomPagination<BrandWithProduct[]>>>(
    () => ({
      url:`${environment.baseUrl}brands/search-with-products`,
      params: {
        'size': this.brandsWithProductSize(),
        'keyword': this.brandKeyword()
      }
    }),
    { defaultValue: initBrandWithProduct }
  )

  rangePriceResource = httpResource<EcomResponse<{minPrice: number, maxPrice: number}>>(
    () =>({
      url: `${environment.baseUrl}products/getRangePrice`,
      params: {
        'name__like': this.productFilter().keyword,
        'brand.id__in': this.productFilter().brands.map(brand => brand.id).join(","),
        'category.id__in': this.productFilter().categories.map(category => category.id).join(","),
        'quantity__gte': this.productFilter().quantity || 0,
        'size': 0,
      }
    }),
    { defaultValue: initRangePrice }
  )

  productsResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => {
      const filter = this.productFilter();
      const rawParams: Record<string, any> = {
        'page': filter.page,
        'name__like': filter.keyword,
        'brand.id__in': filter.brands.map(brand => brand.id).join(','),
        'category.id__in': filter.categories.map(category => category.id).join(','),
        'price__gte': filter.minPrice,
        'price__lte': filter.maxPrice,
        'sort': filter.sort,
        'quantity__gte': filter.quantity,
      };
      const params = Object.fromEntries(
        Object.entries(rawParams).filter(([_, v]) => v !== null && v !== undefined)
      );
      return {
        url: `${environment.baseUrl}products`,
        params,
      };
    },
    { defaultValue: initProduct }
  );

}
