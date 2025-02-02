import { CocktailList } from "../components/CocktailList/CocktailList";
import { CocktailProvider } from "../state/CocktailContext";

export const Main = () => {
  return (
    <CocktailProvider>
      <CocktailList />
    </CocktailProvider>
  );
};
