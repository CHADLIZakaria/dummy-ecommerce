import { Injectable, resource, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { EcomResponse, initProductDetails, ProductDetails } from '../../../../shared/model/ecom.model';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuickViewService {
  slug = signal('')
  
  quickViewDetailsResource = httpResource<EcomResponse<ProductDetails>>(() =>  
    this.slug() === '' ? undefined:  `${environment.baseUrl}products/${this.slug()}`,
    { defaultValue: initProductDetails }
  )
}
