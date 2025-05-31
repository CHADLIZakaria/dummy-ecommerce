import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CartItem } from '../../pages/home/models/home.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)

  constructor() { }

  getUserCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${environment.baseUrl}cart`)
  }
}
