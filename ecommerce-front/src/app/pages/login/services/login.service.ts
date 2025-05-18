import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserLogin, UserToken } from '../model/login.model';
import { Observable, tap } from 'rxjs';
import { EcomResponse } from '../../../shared/model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient)
  user = signal<UserToken | null>(null)
  constructor() { }

  login(userLogin: UserLogin): Observable<EcomResponse<UserToken>> {
    return this.http.post<EcomResponse<UserToken>>(`${environment.baseUrl}auth/login`, userLogin)
  }
}
