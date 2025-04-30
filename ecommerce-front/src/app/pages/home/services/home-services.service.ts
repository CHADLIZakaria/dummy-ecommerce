import { inject, Injectable } from '@angular/core';
import { Category, EcomPagination, EcomResponse } from '../../../shared/model/ecom.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeServices {
  private baseUrl = "http://localhost:8080/"

  private http = inject(HttpClient);

  getCategories(): Observable<EcomResponse<EcomPagination<Category[]>>> {
    return this.http.get<EcomResponse<EcomPagination<Category[]>>>(`${this.baseUrl}categories`)
  }
}
