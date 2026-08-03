import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserAuthRequest, User } from './authentication.model';
import { first, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterUserRequest } from './register-user.model';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub?: string;          // usually the user id
  email?: string;
  exp?: number;
  iat?: number;
  unique_name: string;
  // add any custom claims your backend puts in the token
  // [key: string]: any;
}

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
    try {
      const authData = localStorage.getItem('authData');
      console.log(authData);
      
      if (!authData) return;
      // this.currentUser.set(JSON.parse(authData) as User);
      let data = JSON.parse(authData) as User;
      const decoded = jwtDecode<JwtPayload>(data.token);

      // Optional: check expiry
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        this.logout();
        return;
      }

      // Map claims → your User model
      const user: User = {
        id: decoded.sub!,
        email: decoded.email!,
        username: decoded.unique_name,
        token: data.token,
      };

      console.log(`%c${JSON.stringify(user)}`, "background-color: crimson, color: red")

      this.currentUser.set(user);
    } catch (err) {
      console.error('Failed to decode JWT', err);
      this.logout();
    }
  }

  public logout(): void {
    localStorage.removeItem('authData');
  }
}
