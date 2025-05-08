import { computed, inject, Injectable, signal } from '@angular/core';
import { EcomResponse, initProductDetails, Product, ProductDetails } from '../../../shared/model/ecom.model';
import { HttpClient, httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private baseUrl = "http://localhost:8080/"
  slug = signal<string>('')
  
  
  productDetailsResource = httpResource<EcomResponse<ProductDetails>>(
    () => `${this.baseUrl}products/${this.slug()}`,
    {defaultValue: initProductDetails}
  )
  avgReview = computed(
    () =>  
      //this.productDetailsResource.value.length > 0 ? 
      this.productDetailsResource.value().data.reviews.reduce((acc, review)=> review.rating+acc, 0)/this.productDetailsResource.value().data.reviews.length
      //:0
    )
}
