import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BeverageCustomisationService } from '../../services/beverage-customisation/beverage-customisation.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-beverages-header',
  imports: [
    NzFlexModule,
    NzAutocompleteModule, NzInputModule, 
    ReactiveFormsModule, NzButtonModule,
    AsyncPipe, CommonModule,
  ],
  // providers: [AuthenticationService],
  standalone: true,
  templateUrl: './beverages-header.html',
  styleUrl: './beverages-header.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class BeveragesHeader {
  private beverageCustomisationService = inject(BeverageCustomisationService);
  searchValue = "";
  searchControl = new FormControl('', { nonNullable: true });
  router = inject(Router);

  protected authService = inject(AuthenticationService);

  options: Observable<string[]> = this.searchControl.valueChanges.pipe(
    // startWith(''),
    this.beverageCustomisationService.liveSearch.bind(this.beverageCustomisationService)
  );
  // = computed(() => {
  //   this.searchControl.valueChanges.pipe(
  //     this.beverageCustomisationService.liveSearch.bind(this.beverageCustomisationService)
  //   );
  // });

  constructor() {
    // this.options$ = this.searchControl.valueChanges.pipe(
    //   this.beverageCustomisationService.liveSearch.bind(this.beverageCustomisationService)
    // );  
  }

  onSearchUserDetails(event: any, value: any): void {
    if (!event.isUserInput) {
      return;
    }

    console.log(`user details to be search w/ id: ${value}`);
    this.router.navigate(['/user-beverage-customisation', value]);
  }

  onLogin() {
    this.router.navigate(['/auth-user'])
  }
  
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onSearch(value: any): void {

    
    
    // this.beverageCustomisationService.liveSearch(value).subscribe((response) => {
    //   this.options = response.map((user: any) => user.username); // Assuming the API returns an array of users with a 'name' property
    //   // console.log('API Response:', response);
    // });
  }
}
