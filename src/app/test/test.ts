import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { BeverageCustomisation, BeverageCustomisationResponse, BeverageType, ComplexIngredientAmountResponse, IngredientAmountResponse } from '../components/beverage-customisation-management/beverage-customisation-management.model';

@Component({
  selector: 'app-test',
  imports: [CommonModule,
    NzFlexModule, NzCardModule,
    NzDividerModule, NzInputNumberModule,
    FormsModule, NzFormModule,
    ReactiveFormsModule,
    NzInputModule, NzButtonModule],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test {
  public customisations = input<BeverageCustomisationResponse[]>();

  public currentBeverageTypeId = signal<number | undefined>(0);
  public fb = inject(FormBuilder);
  public beverageCustomisationForm = signal<FormGroup | undefined>(undefined);
  public isReadOnly = signal<boolean>(false);

  public beverageTypes = computed(() => {
    return this.customisationBeverageTypes();
  }); 

  public beverageTypeIngredients = computed(() => {
    return this.customisations()![0].beverageType.ingredients;
  });

  private buildForm(customisation: BeverageCustomisationResponse): FormGroup {

    this.customisations

    return this.fb.group({
      complexIngredientAmounts: this.fb.array(customisation.complexIngredientAmounts.map((ia) => 
        this.createComplexIngredientAmountGroup(ia)))
    });
  }

  constructor() {
    effect (() => {
      const customs = this.customisations();
      if (customs && customs.length > 0) {
        const form = this.buildForm(customs![0]);
        this.beverageCustomisationForm!.set(form);
      } else {
        // Optional: create empty form or handle "no data" state
        this.beverageCustomisationForm!.set(undefined);
      }
    });
    // this.buildForm(this.customisations()![0]);
  }

  // Typed helper factories (this is the clean, reusable way)
  // private createIngredientAmountGroup(item: IngredientAmountResponse): FormGroup {
  //   return this.fb.group({
  //     id: new FormControl(item.id ?? null, { nonNullable: true }),           // hidden/immutable
  //     ingredientId: new FormControl(item.ingredientId, { nonNullable: true }),
  //     amount: new FormControl<number>(item.amount, {
  //       nonNullable: true,
  //       validators: [Validators.required, Validators.min(0)]
  //     })
  //   });
  // }

  private createComplexIngredientAmountGroup(item: ComplexIngredientAmountResponse): FormGroup {
    return this.fb.group({
      id: new FormControl(item.id ?? null, { nonNullable: true }),
      complexIngredientId: new FormControl(item.complexIngredientId, { nonNullable: true }),
      amount: new FormControl<number>(item.amount, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)]
      })
    });
  }

  get complexIngredientAmounts(): FormArray<FormGroup> {
    return this.beverageCustomisationForm()!.get('complexIngredientAmounts') as FormArray<FormGroup>;
  }

  getComplexIngredientFormIndex(complexId: number): number {
    return this.complexIngredientAmounts.controls.findIndex(ctrl => 
      ctrl.get('complexIngredientId')?.value === complexId
    );
  }

  public getComplexAmountByIngredientId(id: number): number {
    var customisation = this.customisations()![0];

    var amount = customisation?.complexIngredientAmounts?.find((cia: any) => cia.complexIngredientId === id)?.amount;
    return amount ?? 0;
  }

  public customisationBeverageTypes = computed(() => {
    // const details = this.userDetails();
    // const beverageCustomisations = details?.beverageCustomisations;
    // cosnt beverageCustomisation/

    return this.customisations()?.map((bc: any) => {
      const beverageType: BeverageType = {
        id: bc.beverageType.id,
        descr: bc.beverageType.descr,
        ingredients: []
      };
      return beverageType;
    });
  });

  public onSubmit() {

  }

  onShowBeverageTypeIngredients(id: number): void {
    console.log(`beverage type id to be shown: ${id}`);
    this.currentBeverageTypeId.set(id);
  }

}
