import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserAuthRequest, User } from './authentication.model';
import { first, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterUserRequest } from './register-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiBaseUri = environment.apiBaseUrl;
  private http = inject(HttpClient);

  public currentUser = signal<User | null>(null);

  public login(authRequest: UserAuthRequest): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUri}user/login`, {...authRequest, username: authRequest.email})
      .pipe(
        tap((response) => {
          if (response) {
            localStorage.setItem('authData', JSON.stringify(response));
          }
        })
      );
  }

  public register(registerRequest: RegisterUserRequest): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUri}user/register`, {...registerRequest, firstName: "First", lastName: "Last"}
    //   {
    //   username: "JM_12_007",
    //   email: "abc@gxyz12.com",
    //   password: "P@ssword1",
    //   firstName: "First",
    //   lastName: "Last"
    // }
  )
      .pipe(
        tap((response) => {
          if (response) {
            localStorage.setItem('authData', JSON.stringify(response));
          }
        })
      );
  }

  setCurrentUser(): void {
    const authData = localStorage.getItem('authData');
    if (!authData) return;
    this.currentUser.set(JSON.parse(authData) as User);
  }

  public logout(): void {
    localStorage.removeItem('authData');
  }
}
