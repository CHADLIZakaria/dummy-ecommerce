import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { EcomPagination, EcomResponse, initProduct, Product } from '../../../../../shared/model/ecom.model';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompareProductsService {
  
  search = signal({
    keyword: '',
    page: 0
  })
  showSearchPopup = signal(false)

  constructor() { }


  searchProductResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => this.search().keyword  === '' ? undefined : `${environment.baseUrl}products?name__like=${this.search().keyword}&size=6&page=${this.search().page}`,
    { defaultValue: initProduct }
  ) 
}
