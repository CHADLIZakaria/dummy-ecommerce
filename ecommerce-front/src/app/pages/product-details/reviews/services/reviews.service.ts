import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { EcomPagination, EcomResponse, initReviewPagination, Review } from '../../../../shared/model/ecom.model';
import { environment } from '../../../../../environments/environment.development';
import { ProductDetailsService } from '../../services/product-details.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  productDetailsService = inject(ProductDetailsService)
  sort = signal({
    column: 'id',
    order: 'desc',
    page : 0,
    size: 3
  })

  constructor() { }

  reviewsResource = httpResource<EcomResponse<EcomPagination<Review[]>>>(
    () => ({
      url: `${environment.baseUrl}reviews`,
      params: {
        'product.slug__eq': this.productDetailsService.slug(),
        'sort': this.sort().column+','+this.sort().order,
        'size': this.sort().size,
        page: this.sort().page
      }
    }),
    {defaultValue: initReviewPagination}
  )
}
