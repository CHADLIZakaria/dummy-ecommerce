import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { EcomResponse, Product } from '../../../shared/model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteUserProductsService {
  http = inject(HttpClient)

  constructor() { }
  
  getFavoritesProducts(sortBy: string, direction: string): Observable<EcomResponse<Product[]>> {
    const params = new HttpParams()
      .set('column', sortBy)
      .set('direction', direction);
    return this.http.get<EcomResponse<Product[]>>(
      `${environment.baseUrl}users/user/favorites`,
      {params}
    )
  }
}
