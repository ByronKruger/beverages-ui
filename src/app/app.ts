import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeverageCustomisation } from './services/beverage-customisation/beverage-customisation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('beverages');

  private service = inject(BeverageCustomisation);
  
  constructor() {
    this.service.searchUserByName();
  }
}
