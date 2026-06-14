import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { OauthButtons } from '../oauth-buttons/oauth-buttons';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-authenticate-user',
  imports: [NzFlexModule, NzDividerComponent,
    NzInputModule, NzFormModule,
    ReactiveFormsModule, NzFlexModule,
    NzCardModule, NzButtonModule, 
    OauthButtons, NzIconModule
  ],
  templateUrl: './authenticate-user.html',
  styleUrl: './authenticate-user.scss',
})
export class AuthenticateUser {
  public authClicked = output<any>();

  private fb = inject(NonNullableFormBuilder);

  public loginForm = this.fb.group({
    username: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]]
  }) as FormGroup<{username: FormControl<string>, password: FormControl<string>, email: FormControl<string>}>;

  onAuth(): void {
    this.authClicked.emit(this.loginForm.value);
  }
}
