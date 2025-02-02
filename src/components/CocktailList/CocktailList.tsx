import { useContext } from "react";
import { CocktailItem } from "../CocktailItm/CocktailItem";
import { SearchInput } from "../SearchInput/SearchInput";
import "./style.css";
import { CocktailContext } from "../../state/CocktailContext";
import { Loader } from "../Loader/Loader";

export const CocktailList = () => {
  const { cocktails, isLoading } = useContext(CocktailContext);

  return (
    <>
      <SearchInput />
      <Loader isLoading={isLoading} />
      <div className="cocktail-list">
        {cocktails.length > 0 &&
          cocktails.map((cocktail) => {
            return <CocktailItem key={cocktail.idDrink} cocktail={cocktail} />;
          })}
      </div>
    </>
  );
};
