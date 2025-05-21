import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { EcomResponse } from '../../../shared/model/ecom.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  http = inject(HttpClient)
  constructor() { }

  saveUser(user: {username: string, password: string, firstName: string, lastName: string}): Observable<EcomResponse<UserRegisterResponse>> {
    const formData = new FormData()
    formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}))
    return this.http.post<EcomResponse<UserRegisterResponse>>(`${environment.baseUrl}auth/register`, formData)
  }
}
export type UserRegisterResponse = {

}