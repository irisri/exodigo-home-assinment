import { Cocktail } from "../../types/cocktail";
import { CocktailItem } from "../CocktailItm/CocktailItem";

export const CocktailList = ({ cocktails }: { cocktails: Cocktail[] }) => {
  return (
    <>
      <h1>The cocktail DB</h1>
      {cocktails.length > 0 &&
        cocktails.map((cocktail) => {
          return <CocktailItem key={cocktail.idDrink} cocktail={cocktail} />;
        })}
    </>
  );
};
