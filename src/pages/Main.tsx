import { Loader } from "../components/Loader/Loader";
import { CocktailList } from "../components/CocktailList/CocktailList";
import { CocktailContext, CocktailProvider } from "../state/CocktailContext";
import { useContext } from "react";

export const Main = () => {
  const { isLoading, cocktails } = useContext(CocktailContext);

  return (
    <CocktailProvider>
      <Loader isLoading={isLoading} />
      <CocktailList cocktails={cocktails} />
    </CocktailProvider>
  );
};
