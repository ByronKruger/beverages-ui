import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BeverageCustomisation {

  private httpClient = inject(HttpClient);

  public searchUserByName(): any {
    this.httpClient.get(`/api/beverage-customisation/users?name=${"Alessio001@gmail.com"}`).subscribe((response) => {
      console.log(response);
    });
  }

}
