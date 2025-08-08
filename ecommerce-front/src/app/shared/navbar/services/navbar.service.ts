import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Category, EcomPagination, EcomResponse, initCategoryPagination, initProduct, Product } from '../../model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  keyword = signal<string>('')

  constructor() { }

  categoriesResource = httpResource<EcomResponse<EcomPagination<Category[]>>>(
    () => `${environment.baseUrl}categories?size=0`,
    { defaultValue: initCategoryPagination }
  )
  

  searchProductResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => this.keyword()  === '' ? undefined : `${environment.baseUrl}products?name__like=${this.keyword()}`,
    { defaultValue: initProduct }
  )

}
