import { computed, inject, Injectable, signal } from '@angular/core';
import { EcomPagination, EcomResponse, initProductDetails, initProducts, initReviewPagination, Product, ProductDetails, Review } from '../../../shared/model/ecom.model';
import { HttpClient, httpResource } from '@angular/common/http';
import { url } from 'inspector';
import { environment } from '../../../../environments/environment.development';
import { ReviewSave } from '../product-details.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  slug = signal<string>('')
  showWritePopup = signal(false)
  http = inject(HttpClient)

  productDetailsResource = httpResource<EcomResponse<ProductDetails>>(
    () => this.slug()  === '' ? undefined : `${environment.baseUrl}products/${this.slug()}`,
    { defaultValue: initProductDetails }
  )
  
  reviewsResource = httpResource<EcomResponse<EcomPagination<Review[]>>>(
    () => ({
      url: `${environment.baseUrl}reviews`,
      params: {
        'product.slug__eq': this.slug(),
        'size': 0,
      }
    }),
    {defaultValue: initReviewPagination}
  )

  avgReview = computed(() =>
   this.reviewsResource.value().data.data.length === 0 ? 0: this.reviewsResource.value().data.data.reduce((acc, review)=> review.rating+acc, 0)/this.reviewsResource.value().data.data.length
  )

  productsSimularResource = httpResource<EcomResponse<Product[]>>(
    () => this.slug()  === '' ? undefined : `${environment.baseUrl}products/${this.slug()}/similar`,
    { defaultValue: initProducts }
  )

  addReview(review: ReviewSave): Observable<EcomResponse<Review>> {
    return this.http.post<EcomResponse<Review>>(`${environment.baseUrl}reviews`, review).pipe(
      tap(
        data => {
          if(data.status === 201) {
            this.reviewsResource.reload()
          }
        }
      )
    )
  }
  

}
