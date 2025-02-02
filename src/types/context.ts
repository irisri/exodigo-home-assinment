import { Cocktail } from "./cocktail";

export type CocktailContextType = {
  cocktails: Cocktail[];
  searchInput: string;
  setSearchInput: (value: string) => void;
  isLoading: boolean;
  getCocktails: (value: boolean) => void;
  error: string;
};
