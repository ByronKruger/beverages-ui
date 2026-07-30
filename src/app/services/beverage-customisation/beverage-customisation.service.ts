import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import { BeverageCustomisationTemplate, RecentBeverageCustomisation } from './beverage-customisation.model';
import { AddBeverageCustomisation1, BeverageCustomisation } from '../../components/beverage-customisation-management/beverage-customisation-management.model';
import { CreateBeverageCustomisation } from '../../components/create-beverage-customisation/create-beverage-customisation';

@Injectable({
  providedIn: 'root',
})
export class BeverageCustomisationService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  private searchUser(name: string): Observable<string[]> {
    return this.httpClient.get(`${this.baseUrl}beverage-customisation/users?name=${name}`).pipe(
      map((response: any) => response.map((user: any) => user.id)), // Assuming the API returns an array of users with a 'username' property
    );
  }

  public liveSearch(query: Observable<string>): Observable<any> {
    return query.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.searchUser(name)),
      catchError(() => of([]))
    );
  }

  public searchUserDetails(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}beverage-customisation/customisations?userId=${id}`).pipe(
      map((response: any) => response)
    );
  }

  public getRecentBeverageCustomisations(): Observable<RecentBeverageCustomisation[]> {
    return this.httpClient.get<RecentBeverageCustomisation[]>(`${this.baseUrl}beverage-customisation/recent-beverage-customisations`);
  }

  public getBeverageCustomisationTemplate(): Observable<BeverageCustomisationTemplate[]> {
    return this.httpClient.get<BeverageCustomisationTemplate[]>(`${this.baseUrl}beverage-customisation/beverage-types`);
  }

  public addBeverageCustomisation(beverageCustomisation: AddBeverageCustomisation1): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}beverage-customisation/add-customisation`, {...beverageCustomisation, beverageTypeId: beverageCustomisation.beverageTypeId});
  }
  
}