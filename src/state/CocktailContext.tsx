import React, { useState, createContext, useEffect } from "react";
import { httpServices } from "../services/httpService";
import { CocktailContextType } from "../types/context.ts";
import { Cocktail } from "../types/cocktail.ts";
import { storageService } from "../utils/util.ts";
import { COCKTAIL_LIST_KEY } from "../utils/constant.ts";

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
    storageService.set(COCKTAIL_LIST_KEY, JSON.stringify(data));
    return data;
  };

  const getCocktails = async (shouldCheckStorage: boolean) => {
    setLoading(true);

    const storage = storageService.get(COCKTAIL_LIST_KEY);
    if (shouldCheckStorage && !!storage && JSON.parse(storage).length > 0) {
      const cocktailList = JSON.parse(storage) as Cocktail[];
      setCocktails(cocktailList);
    } else {
      const cocktailList = await searchCocktails();
      if (cocktailList === null)
        setError(`Sorry there is no ${searchInput} in the database`);
      setCocktails(cocktailList ?? []);
    }

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
