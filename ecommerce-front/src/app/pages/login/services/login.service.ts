import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserLogin, UserToken } from '../model/login.model';
import { Observable, tap } from 'rxjs';
import { EcomResponse, User } from '../../../shared/model/ecom.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient)
  user = signal<User | null>(null)
  constructor() { }

  login(userLogin: UserLogin): Observable<EcomResponse<UserToken>> {
    return this.http.post<EcomResponse<UserToken>>(`${environment.baseUrl}auth/login`, userLogin).pipe(
      tap(data => {
        if(data.status===200) {
          localStorage.setItem("token", data.data.token)
          this.getUser()
        }
      })
    )
  }
  getUser(): Observable<EcomResponse<User>> {
    return this.http.post<EcomResponse<User>>(`${environment.baseUrl}users`, {}).pipe(
      tap(data => {
        if(data.status===200) {
          this.user.set(data.data)
        }
      })
    )
  }
}
