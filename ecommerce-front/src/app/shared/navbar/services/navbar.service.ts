import { Injectable, resource, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Category, EcomPagination, EcomResponse, initCategoryPagination, initProduct, initProducts, Product } from '../../model/ecom.model';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  keyword = signal<string>('')

  constructor() { }

  categoriesResource = resource<EcomResponse<EcomPagination<Category[]>>, {}>({
    loader: async () => {
      const categories = await fetch(`${environment.baseUrl}categories?size=0`)
      return categories.json()
    },
    defaultValue: initCategoryPagination
  })

  searchProductResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => this.keyword()  === '' ? undefined : `${environment.baseUrl}products?name__like=${this.keyword()}`,
    { defaultValue: initProduct }
  )

}
