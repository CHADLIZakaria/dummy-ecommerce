import { computed, inject, Injectable, signal } from '@angular/core';
import { EcomPagination, EcomResponse, initProductDetails, initReviewPagination, Product, ProductDetails, Review } from '../../../shared/model/ecom.model';
import { HttpClient, httpResource } from '@angular/common/http';
import { url } from 'inspector';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  slug = signal<string>('')
  
  
  productDetailsResource = httpResource<EcomResponse<ProductDetails>>(
    () => `${environment.baseUrl}products/${this.slug()}`,
    {defaultValue: initProductDetails}
  )

  reviewsResource = httpResource<EcomResponse<EcomPagination<Review[]>>>(
    () => ({
      url: `${environment.baseUrl}reviews`,
      params: {
        'product.slug__eq': this.slug()
      }        
    }),
    {defaultValue: initReviewPagination}     
  )
  avgReview = computed(
    () => 
      this.reviewsResource.value().data.data.reduce((acc, review)=> review.rating+acc, 0)/this.reviewsResource.value().data.data.length
  )
  
}
