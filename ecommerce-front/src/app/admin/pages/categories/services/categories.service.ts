import { Injectable, resource, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Category, EcomPagination, EcomResponse, initCategoryPagination } from '../../../../shared/model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor() { }
  
  query = signal<{size: number, page: number}>({
    size: 6,
    page: 0
  })
  
  categories = resource<EcomResponse<EcomPagination<Category[]>>, {size: number, page: number}>({
    request: () => ({
      size: this.query().size,
      page: this.query().page
    }),
    loader: async({request}) => {
      const categories = await fetch(`${environment.baseUrl}categories?size=${request.size}&page=${request.page}`)
      return categories.json()
    },
    defaultValue: initCategoryPagination
  });
  
}
