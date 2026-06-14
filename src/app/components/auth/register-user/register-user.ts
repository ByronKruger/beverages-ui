import { Component, inject } from '@angular/core';
import { RegisterUserService } from './register-user.service';

@Component({
  selector: 'app-register-user',
  imports: [],
  templateUrl: './register-user.html',
  styleUrl: './register-user.scss',
})
export class RegisterUser {
  public service = inject(RegisterUserService);  

  public ngOninit(): void {
    this.service.register({
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "password123",
      username: "johndoe"
    }).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
      },
      error: (error) => {
        console.error('Failed to register user:', error);
      }
    });
  }
}
