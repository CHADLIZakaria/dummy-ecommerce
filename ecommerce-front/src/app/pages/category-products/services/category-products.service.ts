import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Category, EcomResponse, initCategory } from '../../../shared/model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsService {
  slug = signal('')

  constructor() { }

  categoryResource = httpResource<EcomResponse<Category>>(
    () => this.slug()  === '' ? undefined : `${environment.baseUrl}categories/slug/${this.slug()}`,
    { defaultValue: initCategory }
  )
}
