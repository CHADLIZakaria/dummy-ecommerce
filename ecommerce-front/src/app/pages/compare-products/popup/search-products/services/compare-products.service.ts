import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { EcomPagination, EcomResponse, initProduct, Product } from '../../../../../shared/model/ecom.model';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompareProductsService {

  constructor() { }

  keyword = signal('')

  searchProductResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => this.keyword()  === '' ? undefined : `${environment.baseUrl}products?name__like=${this.keyword()}&size=6`,
    { defaultValue: initProduct }
  ) 
}
