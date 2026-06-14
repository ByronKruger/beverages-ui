import { Component, computed, effect, inject, input, Input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeverageCustomisationService } from '../../services/beverage-customisation/beverage-customisation.service';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { BeverageCustomisation, BeverageCustomisationResponse, BeverageType, ComplexIngredient, Ingredient, UserBeverageDetails } from './beverage-customisation-management.model';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-beverage-customisation-management',
  imports: [CommonModule,
    NzFlexModule, NzCardModule,
    NzDividerModule, NzInputNumberModule,
    FormsModule, NzFormModule,
    ReactiveFormsModule,
    NzInputModule, NzButtonModule
  ],
  templateUrl: './beverage-customisation-management.html',
  styleUrl: './beverage-customisation-management.scss',
})
export class BeverageCustomisationManagement {
  public activatedRoute = inject(ActivatedRoute);
  public userId = signal(this.activatedRoute.snapshot.paramMap.get('id')!);
  public userDetails = signal<any | null>(null);
  public currentBeverageTypeId = signal<number>(0);
  public isLoading = input<boolean>();

  public userBeverageCustomisations = input<any>();
  public isReadOnly = input<boolean>(false);
  public allBeverageTypes = input<any>();
  public isEdit = input<boolean>(false);
  public isCreate = input<boolean>(false);

  private fb = inject(FormBuilder);
  public beverageCustomisationForm?: FormGroup;

  public beverageCustomisationTitle = computed(() => {
    const title = "";

    if (this.isReadOnly()){
      return `xxx's Beverage Customisations`;
    } else if (this.isEdit() && !this.isCreate()) {
      return `Edit Your Beverage Customisation`;
    } else { // create
      return `Create Your Beverage Customisation`;
    }
  });

  public beverageTypes = computed(() => {
    if (this.isReadOnly() || this.isEdit()){
      return this.customisationBeverageTypes();
    }
    else {
      return this.allBeverageTypes();
    }
  });

  // public userNames = computed(() => {
  //   const details = this.userDetails();
  //   // const user = details.
  //   return user ? [user] : [];
  // }

  public customisationBeverageTypes = computed(() => {
    // const details = this.userDetails();
    // const beverageCustomisations = details?.beverageCustomisations;
    // cosnt beverageCustomisation/

    return this.userBeverageCustomisations()?.map((bc: any) => {
      const beverageType: BeverageType = {
        id: bc.beverageType.id,
        descr: bc.beverageType.descr,
        ingredients: []
      };
      return beverageType;
    });
  });

  public selectedBeverageType = computed(() => {

  });

  public getAmountByIngredientId(id: number): number {
    var customisation = this.selectedBeverageCustomisation();

    var amount = customisation?.ingredientAmounts?.find((ia: any) => ia.ingredientId === id)?.amount;
    return amount ?? 0;
  }

  public getComplexAmountByIngredientId(id: number): number {
    var customisation = this.selectedBeverageCustomisation();

    var amount = customisation?.complexIngredientAmounts?.find((cia: any) => cia.complexIngredientId === id)?.amount;
    return amount ?? 0;
  }

  private defaultBeverageCustomisation = computed(() => {
    let customisation = this.userBeverageCustomisations();

    return (customisation && customisation.length > 0) ? customisation[0] : null;
  });

  public selectedBeverageCustomisation = computed(() => {
    // const userDetails = this.userDetails();           // BeverageCustomisation[] | null
    // const beverageCustomisations = userDetails?.beverageCustomisations; // BeverageCustomisation[] | undefined
    const customisations = this.userBeverageCustomisations(); // BeverageCustomisation[] | undefined
    const id = this.currentBeverageTypeId();       // number | undefined

    if (!customisations) return null;

    // console.log(`%c${id}`, "background-color: black; color: hotpink")
    // if (!beverageCustomisations || id === undefined) {
    //   return [] as Ingredient[];                         // or null/undefined depending on your preference
    // }

    // Find the first matching customisation (or use .find() instead of filter + at(0))
    // const matchingCustomisation = beverageCustomisations.find(
    //   (bc) => bc.beverageType.id === targetId
    // );

    // return matchingCustomisation?.beverageType.ingredients ?? [];
    // var complexIngredientAmounts = beverageCustomisations?.find((bc: any) => bc.beverageType.id === id)?.complexIngredientAmounts;
    // console.log("complexIngredientAmounts: " + JSON.stringify(complexIngredientAmounts));
    // var beverageTypeId = beverageCustomisations?.find((bc: any) => bc.beverageType.id === id)?.beverageType.id;
    // console.log("beverageTypeId: " + JSON.stringify(beverageTypeId));
    var currentCustomisation = customisations?.find((bc: any) => bc.beverageType.id === id) ?? null;
    var selectedBeverageCustomisation = (id == 0) ? this.defaultBeverageCustomisation() : currentCustomisation ?? null;

    // if (this.isEdit() && !this.isReadOnly()) {
    //   var complexIngredientAmounts: any[] = [];
    //   var ingredientAmounts: any[] = [];

    //   selectedBeverageCustomisation.beverageType.ingredients.forEach((i: any) => {
    //     if (i.isComplex && i.complexIngredients) {
    //       i.complexIngredients.forEach((ci: any) => {
    //         // var amount = selectedBeverageCustomisation.complexIngredientAmounts?.find((cia: any) => cia.complexIngredientId === ci.id)?.amount ?? 0;
    //         complexIngredientAmounts.push({amount: 0, complexIngredientId: ci.id});
    //       });
    //       // complexIngredientAmounts.push({});
    //     } else {
    //       ingredientAmounts.push({amount: 0, ingredientId: i.id});
    //     }

    //   });

    //   selectedBeverageCustomisation.complexIngredientAmounts = complexIngredientAmounts;
    //   selectedBeverageCustomisation.ingredientAmounts = ingredientAmounts;
    // }

    return selectedBeverageCustomisation; 
  });

  constructor() {
    effect(() => {
      const selectedBeverageCustomisation = this.selectedBeverageCustomisation();
      if (this.isEdit() && !this.isCreate()) {
        this.buildFormForEdit(selectedBeverageCustomisation);
      } else if (this.isEdit() && this.isCreate()) {
        this.buildFormForCreate(selectedBeverageCustomisation);
      }
    });
  }

  private buildFormForCreate(customisationTemplate: any) {
    let ciaFormGroup: FormGroup[] = [];
    let iaFormGroup: FormGroup[] = [];

    if (customisationTemplate){
      customisationTemplate.beverageType.ingredients.forEach((i: any) => {

        if (i.isComplex) {
          i.complexIngredients.forEach((ci: any) => {
            // let ciaData = customisationTemplate.complexIngredientAmounts
            //   .find((cia: any) => cia.complexIngredientId == ci.id);

            ciaFormGroup.push(this.fb.group({
              id: i.id,
              amount: 0,
              complexIngredientId: ci.id,
            }));
          });
        }
        else {
          iaFormGroup.push(this.fb.group({
            id: i.id,
            amount: 0,
            ingredientId: i.id,
          }));
        }
      });
    
      this.beverageCustomisationForm = this.fb.group({
        complexIngredientAmounts: this.fb.array(ciaFormGroup),
        ingredientAmounts: this.fb.array(iaFormGroup)
      })
    }
  }

  private buildFormForEdit(customisation: any) { // BeverageCustomisation[]
    let ciaFormGroup: FormGroup[] = [];
    let iaFormGroup: FormGroup[] = [];

    if (customisation){
      customisation.beverageType.ingredients.forEach((i: any) => {

        if (i.isComplex && i.complexIngredients) {
          i.complexIngredients.forEach((ci: any) => {
            let ciaData = this.selectedBeverageCustomisation().complexIngredientAmounts
              .find((cia: any) => cia.complexIngredientId == ci.id);

            ciaFormGroup.push(this.fb.group({
              id: ciaData?.id ?? null,
              amount: ciaData?.amount ?? 0,
              complexIngredientId: ci.id,
            }));
          });
        }
        else {
          iaFormGroup.push(this.fb.group({
            id: i?.id ?? null,
            amount: i?.amount ?? 0,
            ingredientId: i.id,
          }));
        }
      });
    
      this.beverageCustomisationForm = this.fb.group({
        complexIngredientAmounts: this.fb.array(ciaFormGroup),
        ingredientAmounts: this.fb.array(iaFormGroup)
      })
    }

    // selectedBeverageCustomisation.ingredientAmounts.forEach((i: any) => {
    //   this.ingredientAmounts.push(this.fb.group({id: i.ingredientId, amount: i.amount}));
    // });
    // selectedBeverageCustomisation.complexIngredientAmounts.forEach((i: any) => {
    //   this.complexIngredientAmounts.push(this.fb.group({id: i.complexIngredientId, amount: i.amount}));
    // });
  }

  public beverageTypeIngredients = computed(() => {
    return this.selectedBeverageCustomisation()?.beverageType.ingredients;
  });

  private beverageCustomisationService = inject(BeverageCustomisationService);

  get ingredientAmounts(): FormArray {
    return this.beverageCustomisationForm!.get('ingredientAmounts') as FormArray;
  }

  get complexIngredientAmounts(): FormArray {
    return this.beverageCustomisationForm!.get('complexIngredientAmounts') as FormArray;
  }

  getSimpleIngredientFormIndex(ingredientId: number): number {
    return this.ingredientAmounts.controls.findIndex(ctrl => 
      ctrl.get('ingredientId')?.value === ingredientId
    );
  }

  getComplexIngredientFormIndex(complexId: number): number {
    return this.complexIngredientAmounts.controls.findIndex(ctrl => 
      ctrl.get('complexIngredientId')?.value === complexId
    );
  }

  ngOnInit(): void {
    this.beverageCustomisationForm = this.fb.group({
      ingredientAmounts: this.fb.array<FormGroup<{
        id: FormControl<number | null>,
        amount: FormControl<number | null>
      }>>([]),
      complexIngredientAmounts: this.fb.array<FormGroup<{
        id: FormControl<number | null>,
        amount: FormControl<number | null>
      }>>([])
    });
    // this.beverageCustomisationService.searchUserDetails(this.userId()).subscribe(
    //   (response: BeverageCustomisationResponse[]) => {
    //   const beverageCustomisations: BeverageCustomisation[] = response.map((item) => {

    //     const beverageType: BeverageType = {
    //       id: item.beverageType.id,
    //       descr: item.beverageType.descr,
    //       ingredients: item.beverageType.ingredients.map((ingredient) => {
    //         const ing: Ingredient = {
    //           id: ingredient.id,
    //           descr: ingredient.descr,
    //           isComplex: ingredient.isComplex,
    //           complexIngredients: ingredient.complexIngredients?.map((complexIngredient) => {
    //             const complexIng: ComplexIngredient = {
    //               id: complexIngredient.id,
    //               descr: complexIngredient.descr
    //             }
    //             return complexIng;
    //           })
    //         }
    //         return ing;
    //       })
    //     };

    //     console.log("item.complexIngredientAmounts: " + JSON.stringify(item.complexIngredientAmounts));

    //     const beverageCustomisation: BeverageCustomisation = {
    //       id: item.id,
    //       beverageType: beverageType,
    //       ingredientAmounts: item.ingredientAmounts,
    //       complexIngredientAmounts: item.complexIngredientAmounts
    //     };

    //     return beverageCustomisation;
    //   });

    //   const user = response.at(0)?.user;

    //   const userBeverageCustomisations: UserBeverageDetails = {
    //     id: 0,
    //     beverageCustomisations: beverageCustomisations,
    //     user: user
    //   };

    //   this.userDetails.set(userBeverageCustomisations);
    //   this.currentBeverageTypeId.set(response.at(0)?.beverageType.id);
      
    //   console.log('User Details API Response:', JSON.stringify(response));
    // });
  }

  onShowBeverageTypeIngredients(id: number): void {
    console.log(`beverage type id to be shown: ${id}`);
    this.currentBeverageTypeId.set(id);
  }

  onSubmit() {
    console.log(this.beverageCustomisationForm?.value);
  }
}
