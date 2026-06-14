import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserAuthRequest, User } from './authentication.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  setCurrentUser(): void {
    const authData = localStorage.getItem('authData');
    if (!authData) return;
    this.currentUser.set(JSON.parse(authData) as User);
  }

  public logout(): void {
    localStorage.removeItem('authData');
  }
}
