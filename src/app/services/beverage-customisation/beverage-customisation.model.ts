export interface RecentBeverageCustomisation {
    id: number,
    username: string;
    beverageTypeDescr: string;
    ingredientsDescr: string[];
}

export interface BeverageCustomisationTemplate {
    beverageType: BeverageTypeTemplate;
}

export interface BeverageTypeTemplate {
    id: number;
    descr: string;
    ingredients: IngredientTemplate[];
}

export interface IngredientTemplate {
    id: number;
    descr: string;
    isComplex: boolean;
    complexIngredients?: ComplexIngredientTemplate[];
}

export interface ComplexIngredientTemplate {
    id: number;
    descr: string;
}