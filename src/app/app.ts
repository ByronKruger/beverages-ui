import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeveragesHeader } from './components/beverages-header/beverages-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { BeverageCustomisationService } from './services/beverage-customisation/beverage-customisation.service';
import { environment } from '../environments/environment.development';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BeveragesHeader, 
    NzLayoutModule,NzFlexModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('beverages');

  private authService = inject(AuthenticationService);
  // private service = inject(BeverageCustomisationService);
  
  public env = environment.apiBaseUrl;
  public envUrl = environment.production;

  constructor() {
    this.authService.setCurrentUser();
    // this.service.searchUserD("Alessio001@gmail.com").subscribe();
  }

  ngOnInit(): void {
    console.log(`🚀 Environment loaded:\t ${this.env}`);//, {
      // production: environment.production,
    //   apiBaseUrl: environment.apiBaseUrl || 'not set',
    //   whichFile: environment.production ? 'PROD' : 'DEV/LOCAL'
    // });
  }
}
