import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserAuthRequest } from '../../services/authentication/authentication.model';
import { AuthenticateUser } from '../auth/authenticate-user/authenticate-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coffeeg-authenticate-user',
  imports: [AuthenticateUser],
  templateUrl: './coffeeg-authenticate-user.html',
  styleUrl: './coffeeg-authenticate-user.scss',
})
export class CoffeegAuthenticateUser {
  private authService = inject(AuthenticationService)
  private router = inject(Router);

  public onAuthClicked(userAuthData: UserAuthRequest): void {
    this.authService.login(userAuthData).subscribe({
      next: (response) => {
        console.log('Authentication successful:', response);
        this.authService.currentUser.set(response);
        this.router.navigate(['/']);
        // Handle successful authentication, e.g., store token, navigate, etc.
      },
      error: (error) => {
        console.error('Authentication failed:', error);
        // Handle authentication failure, e.g., show error message to user
      }
    });
  }
}
