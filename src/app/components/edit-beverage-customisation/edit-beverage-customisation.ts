import { Component, computed, inject, signal } from '@angular/core';
import { BeverageCustomisationManagement } from '../beverage-customisation-management/beverage-customisation-management';
import { BeverageCustomisationService } from '../../services/beverage-customisation/beverage-customisation.service';
import { ActivatedRoute } from '@angular/router';
import { BeverageCustomisation, BeverageCustomisationResponse, BeverageType, ComplexIngredient, Ingredient } from '../beverage-customisation-management/beverage-customisation-management.model';
import { CommonModule } from '@angular/common';
import { Test } from '../../test/test';

@Component({
  selector: 'app-edit-beverage-customisation',
  imports: [
    BeverageCustomisationManagement,
    CommonModule],
  templateUrl: './edit-beverage-customisation.html',
  styleUrl: './edit-beverage-customisation.scss',
})
export class EditBeverageCustomisation {
  public userBeverageCustomisations = signal<any>(null);
  public isLoading = signal<boolean>(false);

  private route = inject(ActivatedRoute);
  private userId = signal<string>(this.route.snapshot.paramMap.get("userId")!);
  private beverageCustomisationService = inject(BeverageCustomisationService);

  // public userBeverageCustomisations = computed(() => {

  // })

  ngOnInit() {
    this.isLoading.set(true);
    this.beverageCustomisationService.searchUserDetails("946ceec5-a8f5-4142-ae30-7da59f08246a").subscribe(
      (response: BeverageCustomisationResponse[]) => {
        const a = 2;
      //   const beverageCustomisations: BeverageCustomisation[] = response.map((item) => {
      //     const beverageType: BeverageType = {
      //         id: item.beverageType.id,
      //         descr: item.beverageType.descr,
      //         ingredients: item.beverageType.ingredients.map((ingredient) => {
      //           const ing: Ingredient = {
      //             id: ingredient.id,
      //             descr: ingredient.descr,
      //             isComplex: ingredient.isComplex,
      //             complexIngredients: ingredient.complexIngredients?.map((complexIngredient) => {
      //               const complexIng: ComplexIngredient = {
      //                 id: complexIngredient.id,
      //                 descr: complexIngredient.descr
      //               }
      //               return complexIng;
      //             })
      //           }
      //           return ing;
      //         })
      //     };
        
      //     console.log("item.complexIngredientAmounts: " + JSON.stringify(item.complexIngredientAmounts));
  
      //     const beverageCustomisation: BeverageCustomisation = {
      //       id: item.id,
      //       beverageType: beverageType,
      //       ingredientAmounts: item.ingredientAmounts,
      //       complexIngredientAmounts: item.complexIngredientAmounts
      //     };
  
      //   return beverageCustomisation;
      // });

      // this.userBeverageCustomisations.set(beverageCustomisations);
      this.userBeverageCustomisations.set(response);
      this.isLoading.set(false);
    });
  };
}
