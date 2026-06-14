import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUserRequest, RegisterUserResponse } from './register-user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  private apiBaseUri = environment.apiBaseUrl;
  private http = inject(HttpClient);

  public register(registerUser: RegisterUserRequest): Observable<RegisterUserResponse> {
    return this.http.post<RegisterUserResponse>(`${this.apiBaseUri}user/register`, registerUser);
  }
}
