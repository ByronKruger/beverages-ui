import { Component, effect, inject, signal } from '@angular/core';
import { BeverageCustomisationManagement } from '../beverage-customisation-management/beverage-customisation-management';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { BeverageCustomisationService } from '../../services/beverage-customisation/beverage-customisation.service';

@Component({
  selector: 'app-create-beverage-customisation',
  imports: [BeverageCustomisationManagement, CommonModule],
  // providers: [AuthenticationService],
  templateUrl: './create-beverage-customisation.html',
  styleUrl: './create-beverage-customisation.scss',
})
export class CreateBeverageCustomisation {
  protected authService = inject(AuthenticationService);
  private beverageCustomisationService = inject(BeverageCustomisationService);

  protected allUserBeverageCustomisations = signal<any>(null);

  ngOnInit() {
    // effect(() => {
      this.beverageCustomisationService.getBeverageCustomisationTemplate().subscribe(
        (response) => {
          this.allUserBeverageCustomisations.set(response);
        }
      );
    // });
  }
}
