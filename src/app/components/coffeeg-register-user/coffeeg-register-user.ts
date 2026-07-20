import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { RegisterUserRequest } from '../auth/register-user/register-user.model';
import { AuthenticateUser } from '../auth/authenticate-user/authenticate-user';

@Component({
  selector: 'app-coffeeg-register-user',
  imports: [AuthenticateUser],
  templateUrl: './coffeeg-register-user.html',
  styleUrl: './coffeeg-register-user.scss',
})
export class CoffeegRegisterUser {
  private authService = inject(AuthenticationService)
  private router = inject(Router);

  public onRegisterClicked(userRegisterData: any): void {
    this.authService.register(userRegisterData).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        this.authService.currentUser.set(response);
        this.router.navigate(['/']);
        // Handle successful registration, e.g., store token, navigate, etc.
      },
      error: (error: any) => {
        console.error('Registration failed:', error);
        // Handle registration failure, e.g., show error message to user
      }
    });
  }
}
