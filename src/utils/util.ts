import {
  Cocktail,
  GetCocktailFromNewProps,
  Ingredient,
  NewCocktailPayloadType,
  StrIngredient,
  StrMeasure,
} from "../types/cocktail";

const setStorage = (key: string, data: string) =>
  localStorage.setItem(key, data);

const getStorage = (key: string) => localStorage.getItem(key);

export const storageService = {
  get: getStorage,
  set: setStorage,
};

export const getIngredients = (cocktail: Cocktail) => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as StrIngredient;
    const measurementKey = `strMeasure${i}` as StrMeasure;

    if (cocktail[ingredientKey] && cocktail[measurementKey])
      ingredients.push({
        ingredient: cocktail[ingredientKey],
        measurement: cocktail[measurementKey],
      });
    else break;
  }
  return ingredients;
};

export const getCocktailFromNew = ({
  cocktailName,
  ingredientList,
  cocktailGlass,
  cocktailAlcoholic,
  instructions,
  cocktailCategory,
  tags,
  img,
}: GetCocktailFromNewProps): NewCocktailPayloadType => {
  const measureAndIngredientObject: {
    [key: StrIngredient | StrMeasure]: string;
  } = ingredientList.reduce(
    (accumulator, ingredient, index) => {
      const ingredientKey = `strIngredient${index + 1}` as StrIngredient;
      const measureKey = `strMeasure${index + 1}` as StrMeasure;
      accumulator[ingredientKey] = ingredient.ingredient;
      accumulator[measureKey] = ingredient.measurement;

      return accumulator;
    },
    {} as {
      [key: StrIngredient | StrMeasure]: string;
    }
  );

  return {
    strAlcoholic: cocktailAlcoholic,
    strCategory: cocktailCategory,
    strDrink: cocktailName,
    strGlass: cocktailGlass,
    strInstructions: instructions,
    strTags: tags?.join() ?? null,
    strDrinkThumb: img,
    strImageAttribution: "",
    ...measureAndIngredientObject,
  } as NewCocktailPayloadType;
};
