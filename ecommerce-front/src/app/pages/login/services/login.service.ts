import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserLoginRequest, UserToken } from '../model/login.model';
import { Observable, tap } from 'rxjs';
import { EcomResponse, UserAuth } from '../../../shared/model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient)
  user = signal<UserAuth | null>(null)
  constructor() { }

  login(userLogin: UserLoginRequest): Observable<EcomResponse<UserToken>> {
    return this.http.post<EcomResponse<UserToken>>(`${environment.baseUrl}auth/login`, userLogin).pipe(
      tap(data => {
        if(data.status===200) {
          localStorage.setItem("token", data.data.token)
          this.getUser()
        }
      })
    )
  }
  getUser(): Observable<EcomResponse<UserAuth>> {
    return this.http.post<EcomResponse<UserAuth>>(`${environment.baseUrl}users`, {}).pipe(
      tap(data => {
        if(data.status===200) {
          this.user.set(data.data)
        }
      })
    )
  }
}
