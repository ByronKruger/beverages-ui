import { Component, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeverageCustomisationService } from '../../services/beverage-customisation/beverage-customisation.service';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { BeverageCustomisation, BeverageCustomisationResponse, BeverageType, ComplexIngredient, Ingredient, UserBeverageDetails } from '../beverage-customisation-management/beverage-customisation-management.model';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { BeverageCustomisationManagement } from '../beverage-customisation-management/beverage-customisation-management';

@Component({
  selector: 'app-user-beverage-customisation',
  imports: [BeverageCustomisationManagement],
  templateUrl: './user-beverage-customisation.html',
  styleUrl: './user-beverage-customisation.scss',
})
export class UserBeverageCustomisation {
  public activatedRoute = inject(ActivatedRoute);
  public userId = signal(this.activatedRoute.snapshot.paramMap.get('id')!);

  public userDetails = signal<any | null>(null);
  // public currentBeverageTypeId = signal<number | undefined>(0);

  // public userBeverageCustomisations = input<any>();
  // public isReadOnly = input<any>();
  // public allBeverageTypes = input<any>();

  private beverageCustomisationService = inject(BeverageCustomisationService);

  ngOnInit(): void {
    this.initialiseUserBeverageCustomisation();
  }

  private initialiseUserBeverageCustomisation() {
      this.beverageCustomisationService.searchUserDetails(this.userId()).subscribe(
      (response: BeverageCustomisationResponse[]) => {
      const beverageCustomisations: BeverageCustomisation[] = response.map((item) => {

        const beverageType: BeverageType = {
          id: item.beverageType.id,
          descr: item.beverageType.descr,
          ingredients: item.beverageType.ingredients.map((ingredient) => {
            const ing: Ingredient = {
              id: ingredient.id,
              descr: ingredient.descr,
              isComplex: ingredient.isComplex,
              complexIngredients: ingredient.complexIngredients?.map((complexIngredient) => {
                const complexIng: ComplexIngredient = {
                  id: complexIngredient.id,
                  descr: complexIngredient.descr
                }
                return complexIng;
              })
            }
            return ing;
          })
        };

        console.log("item.complexIngredientAmounts: " + JSON.stringify(item.complexIngredientAmounts));

        const beverageCustomisation: BeverageCustomisation = {
          id: item.id,
          beverageType: beverageType,
          ingredientAmounts: item.ingredientAmounts,
          complexIngredientAmounts: item.complexIngredientAmounts
        };

        return beverageCustomisation;
      });

      const user = response.at(0)?.user;

      const userBeverageCustomisations: UserBeverageDetails = {
        id: 0,
        beverageCustomisations: beverageCustomisations,
        user: user
      };

      this.userDetails.set(userBeverageCustomisations);
      // this.currentBeverageTypeId.set(response.at(0)?.beverageType.id);
      
      console.log('User Details API Response:', JSON.stringify(response));
    });
  }
}
