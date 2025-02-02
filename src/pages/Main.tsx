import { useEffect, useState } from "react";
import { Loader } from "../components/Loader/Loader";
import { CocktailList } from "../components/CocktailList/CocktailList";
import { httpServices } from "../services/httpService";
import { Cocktail } from "../types/cocktail";
import { Container } from "../components/Container/container";

export const Main = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getCocktails = async () => {
      const res = await httpServices.get("search.php?s=margarita");
      setCocktails(res.data.drinks);
    };
    setLoading(true);
    getCocktails();
    setLoading(false);
  }, []);
  return (
    <Container>
      <Loader isLoading={isLoading} />
      <CocktailList cocktails={cocktails} />
    </Container>
  );
};
