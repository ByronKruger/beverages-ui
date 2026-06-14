import { Component, computed, inject, signal } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { RecentBeverageCustomisation } from '../../services/beverage-customisation/beverage-customisation.model';
import { BeverageCustomisationService } from '../../services/beverage-customisation/beverage-customisation.service';
import { Router } from '@angular/router';
import { RouteType } from './home.model';

@Component({
  selector: 'app-home',
  imports: [NzFlexModule, NzCardModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected authService = inject(AuthenticationService);
  protected beverageCustomisationService = inject(BeverageCustomisationService);
  protected isLoading = signal<boolean>(true);

  private router = inject(Router);

  public recentBeverageCustomisations = signal<RecentBeverageCustomisation[]>([]);
  public hasRecentCustomisations = computed(() => this.recentBeverageCustomisations().length > 0);

  ngOnInit(): void {
    this.beverageCustomisationService.getRecentBeverageCustomisations().subscribe({
      next: (response) => {
        // console.log('Recent beverage customisations retrieved successfully:', response);
        this.recentBeverageCustomisations.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to retrieve recent beverage customisations:', error);
        this.isLoading.set(false);
      }
    });
  }

  onCardClick(routeTo: string): void {
    if (routeTo === 'edit') {
      this.router.navigate([`/edit-beverage-customisation/${this.authService.currentUser()?.email}`]);
    } else if (routeTo === 'create') {
      this.router.navigate(['/create-beverage-customisation']);
    }
  }
}
