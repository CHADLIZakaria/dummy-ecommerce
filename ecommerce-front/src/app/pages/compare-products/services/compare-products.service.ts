import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { EcomPagination, EcomResponse, initProduct, Product } from '../../../shared/model/ecom.model';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompareProductsService {
  search = signal({
    keyword: '',
    page: 0
  })
  showSearchPopup = signal(false)
  private http = inject(HttpClient)

  constructor() { }


  searchProductResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => this.search().keyword  === '' ? undefined : `${environment.baseUrl}products?name__like=${this.search().keyword}&size=6&page=${this.search().page}`,
    { defaultValue: initProduct }
  )

  addProduct(username: string, productSlug: string) {
    return this.http.post(`${environment.baseUrl}compare/${username}/add/${productSlug}`, {})
  }

  getProducts(username: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}compare/${username}`)
  }

}
