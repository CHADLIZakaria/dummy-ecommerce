import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { EcomPagination, EcomResponse, initProduct, Product } from '../../../shared/model/ecom.model';
import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { CompareProduct } from '../compare-products.model';

@Injectable({
  providedIn: 'root'
})
export class CompareProductsService {
  private http = inject(HttpClient)
  search = signal({
    keyword: '',
    page: 0
  })
  showSearchPopup = signal(false)
  compareProducts = signal<CompareProduct[]>([])

  searchProductResource = httpResource<EcomResponse<EcomPagination<Product[]>>>(
    () => this.search().keyword  === '' ? undefined : `${environment.baseUrl}products?name__like=${this.search().keyword}&size=6&page=${this.search().page}`,
    { defaultValue: initProduct }
  )

  addProduct(username: string, productSlug: string): Observable<EcomResponse<CompareProduct>> {
    return this.http.post<EcomResponse<CompareProduct>>(`${environment.baseUrl}compare/${username}/add/${productSlug}`, {}).pipe(
        tap(data => {
          this.compareProducts.set([...this.compareProducts(), data.data])
        })
      )
  }

  getProducts(username: string): Observable<EcomResponse<CompareProduct[]>> {
    return this.http.get<EcomResponse<CompareProduct[]>>(`${environment.baseUrl}compare/${username}`).pipe(
      tap(data => {
        this.compareProducts.set(data.data)
      })
    )
  }

  removeCompareProduct(username: string, productSlug: string) {
      return this.http.delete(`${environment.baseUrl}compare/${username}/remove/${productSlug}`).pipe(
        tap(data => {
          this.compareProducts.set(this.compareProducts().filter(product => product.slug !== productSlug))
        })
      )
  }


}
