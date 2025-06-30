import { Injectable, resource } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Category, EcomPagination, EcomResponse, initCategoryPagination } from '../../model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  categoriesResource = resource<EcomResponse<EcomPagination<Category[]>>, {}>({
    loader: async () => {
      const categories = await fetch(`${environment.baseUrl}categories?size=0`)
      return categories.json()
    },
    defaultValue: initCategoryPagination
  }
)

}
