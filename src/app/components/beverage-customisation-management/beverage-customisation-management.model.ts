export interface UserBeverageDetails {
    id: number,
    beverageCustomisations: BeverageCustomisation[],
    user: User | undefined;
}

export interface User {
    id: string,
    username: string,
    firstName: string,
    lastName: string
}

export interface BeverageCustomisation {
    id: number,
    // beverageTypeId: number,
    beverageType: BeverageType,
    // ingredients: Ingredient[],
    ingredientAmounts: IngredientAmount[] | undefined
    complexIngredientAmounts: ComplexIngredientAmount[] | undefined
}

export interface Ingredient {
    id: number,
    descr: string,
    isComplex: boolean,
    complexIngredients: ComplexIngredient[] | undefined;
}

export interface IngredientAmount {
    id: number,
    amount: number,
    ingredientId: number
}

export interface ComplexIngredientAmount {
    id: number,
    amount: number,
    complexIngredientId: number
}

export interface ComplexIngredient {
    id: number,
    descr: string
}

export interface BeverageType {
    id: number,
    descr: string,
    ingredients: Ingredient[]
}

// export interface BeverageCustomisationsResponse {

// }

export interface BeverageCustomisationResponse {
    id: number,
    beverageType: BeverageTypeResponse,
    beverageTypeId: number,
    complexIngredientAmounts: ComplexIngredientAmountResponse[],
    ingredientAmounts: IngredientAmountResponse[],
    userId: number,
    user: UserResponse;
}

export interface UserResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface BeverageTypeResponse {
    id: number,
    descr: string
    ingredients: IngredientRespone[]
}

export interface IngredientRespone {
    id: number,
    descr: string,
    isComplex: boolean,
    complexIngredients: ComplexIngredientResponse[] | undefined,
}

export interface ComplexIngredientResponse {
    id: number,
    descr: string
}

export interface ComplexIngredientAmountResponse {
    id: number,
    amount: number,
    complexIngredientId: number
}

export interface IngredientAmountResponse {
    id: number,
    amount: number,
    ingredientId: number
}