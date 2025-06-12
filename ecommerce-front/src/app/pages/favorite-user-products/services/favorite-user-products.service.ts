import { inject, Injectable, resource } from '@angular/core';
import { EcomResponse, FavoriteRespone, Product } from '../../../shared/model/ecom.model';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
