import {
  Cocktail,
  Ingredient,
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
