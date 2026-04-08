import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BeverageCustomisation {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  public searchUserByName(): any {
    this.httpClient.get(`${this.baseUrl}/api/beverage-customisation/users?name=${"Alessio001@gmail.com"}`).subscribe((response) => {
      console.log(response);
    });
  }

}
