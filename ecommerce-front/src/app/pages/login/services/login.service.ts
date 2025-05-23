import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserLoginRequest, UserToken } from '../model/login.model';
import { Observable, tap } from 'rxjs';
import { EcomResponse, UserAuth } from '../../../shared/model/ecom.model';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient)
  private platformId: Object = inject(PLATFORM_ID)
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private tokenKey = 'token'
  private expKey = 'token-exp'
  private logoutTimer: any = null
  
  private _user = signal<UserAuth | null>(null)
  user = computed(() => this._user())
  isLoggedIn = computed(() => !!this._user())

  constructor() { 
    if(this.isBrowser) {
      this.autoLogin()
    }
  }

  login(userLogin: UserLoginRequest): Observable<EcomResponse<UserToken>> {
    return this.http.post<EcomResponse<UserToken>>(`${environment.baseUrl}auth/login`, userLogin).pipe(
      tap(data => {
        if(data.status===200) {
          this.storeToken(data.data.token, data.data.expiresAt)
          this.fetchUser().subscribe()
        }
      })
    )
  }
  fetchUser(): Observable<EcomResponse<UserAuth>> {
    return this.http.post<EcomResponse<UserAuth>>(`${environment.baseUrl}users`, {}).pipe(
      tap(data => {
        if(data.status===200) {
          this._user.set(data.data)
        }
      })
    )
  }
  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.tokenKey) : null
  }
  private storeToken(token: string, expiresAt: number) {
    if(this.isBrowser) {
      localStorage.setItem(this.expKey, expiresAt.toString())
      localStorage.setItem(this.tokenKey, token.toString())
      this.autoLogout(expiresAt)
    }
  }
  logout() {
    if(this.isBrowser) {
      localStorage.removeItem(this.tokenKey)
      this._user.set(null)
    }
    this._user.set(null)
    if(this.logoutTimer) {
      clearTimeout(this.logoutTimer)
    }
  }
  private autoLogout(expiresAt: number) {
    if(!this.isBrowser) return;
    const delay = expiresAt - Date.now()
    if(this.logoutTimer) clearTimeout(this.logoutTimer)
    if(delay > 0) {
      this.logoutTimer = setTimeout(() => this.logout(), delay)
    }
    else {
      this.logout()
    }
  }
  private autoLogin() {
    const token = localStorage.getItem(this.tokenKey)
    const expiresAt = parseInt(localStorage.getItem(this.expKey) || '0', 10)
    if(token && expiresAt > Date.now()) {
      this.autoLogout(expiresAt)
      this.fetchUser().subscribe()
    }
    else {
      this.logout()
    }
  }
}
