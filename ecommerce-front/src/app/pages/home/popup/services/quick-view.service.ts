import { Injectable, resource, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { EcomResponse, initProductDetails, ProductDetails } from '../../../../shared/model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class QuickViewService {
  slug = signal('')
  
  quickViewDetailsResource = resource<EcomResponse<ProductDetails>, {slug: string}>({
    request: () => ({
      slug: this.slug()
    }),
    loader: async({request}) => {
      const product = await fetch(`${environment.baseUrl}products/green-chili-pepper`)
      return product.json()
    },
    defaultValue: initProductDetails
  })
}
