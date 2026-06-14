import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-external-auth-handler',
  imports: [],
  templateUrl: './external-auth-handler.html',
  styleUrl: './external-auth-handler.scss',
})
export class ExternalAuthHandler {
  private route = inject(ActivatedRoute);
  private token = signal<string | null>(this.route.snapshot.paramMap.get("token"));

  constructor() {
    effect(() => {
      console.log(`Token:\t${this.token()}`);
    })
  }
}
