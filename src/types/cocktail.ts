export type StrIngredient = `strIngredient${number}`;
export type StrMeasure = `strMeasure${number}`;

export type Cocktail = {
  idDrink: string;
  strDrink: string;
  strIBA: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strImageAttribution: string | null;
  strCategory:
    | "Ordinary Drink"
    | "Cocktail"
    | "Other / Unknown"
    | "Shot"
    | string;
  strTags: string | null;
  strAlcoholic: "Non alcoholic" | "Alcoholic";
  strImageSource: string;
  [key: StrIngredient]: string | null;
  [key: StrMeasure]: string | null;
};

export type CocktailResponse = {
  drinks: Cocktail[] | null | undefined;
};

export type Ingredient = {
  ingredient: string;
  measurement: string;
};
