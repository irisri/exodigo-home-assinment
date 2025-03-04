import React, { useState, createContext, useEffect } from "react";
import { httpServices } from "../services/httpService";
import { CocktailContextType } from "../types/context.ts";
import { Cocktail } from "../types/cocktail.ts";
import { localStorageService } from "../utils/util.ts";
import { ADDED_COCKTAIL, COCKTAIL_LIST_KEY } from "../utils/constant.ts";

const CocktailContext = createContext<CocktailContextType>({
  searchInput: "",
  cocktails: [],
  setSearchInput: () => {},
  isLoading: false,
  getCocktails: () => {},
  error: "",
});

const CocktailProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = useState<string>("Mojito");
  const [debounceId, setDebounceId] = useState<number>();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchCocktails = async () => {
    const res = await httpServices.get(`search.php?s=${searchInput}`);
    const data = res.data.drinks;
    if (!Array.isArray(res.data.drinks)) return null;
    localStorageService.set(COCKTAIL_LIST_KEY, JSON.stringify(data));
    return data;
  };

  const getCocktails = async (shouldCheckStorage: boolean) => {
    const cocktailList: Cocktail[] = [];
    setLoading(true);

    const cocktailsStorage = localStorageService.get(COCKTAIL_LIST_KEY);
    const addedCocktailsString = localStorageService.get(ADDED_COCKTAIL);

    const addedCocktailsArray = addedCocktailsString
      ? (JSON.parse(addedCocktailsString) as Cocktail[])
      : ([] as Cocktail[]);

    if (
      shouldCheckStorage &&
      !!cocktailsStorage &&
      JSON.parse(cocktailsStorage).length > 0
    ) {
      cocktailList.push(...(JSON.parse(cocktailsStorage) as Cocktail[]));
    } else {
      const res = await searchCocktails();
      if (res === null)
        setError(`Sorry there is no '${searchInput}' in the database`);

      cocktailList.push(...(res ?? []));
    }

    const newCocktails = [
      ...cocktailList,
      ...addedCocktailsArray.filter((cocktail) => {
        if (searchInput.length === 0) return false;

        cocktail.strDrink.includes(searchInput);
      }),
    ] as Cocktail[];
    setCocktails(newCocktails);
    setLoading(false);
  };

  const debounce = () => {
    clearTimeout(debounceId);
    const timer = setTimeout(() => getCocktails(false), 1000);
    setDebounceId(timer);
  };

  useEffect(() => {
    return clearTimeout(debounceId);
  }, []);

  useEffect(() => {
    debounce();
  }, [searchInput]);

  return (
    <CocktailContext.Provider
      value={{
        searchInput,
        cocktails,
        setSearchInput,
        isLoading,
        getCocktails,
        error,
      }}
    >
      {children}
    </CocktailContext.Provider>
  );
};

export { CocktailProvider, CocktailContext };
