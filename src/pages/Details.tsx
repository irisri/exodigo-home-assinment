import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cocktail } from "../types/cocktail";
import { httpServices } from "../services/httpService";
import { Loader } from "../components/Loader/Loader";
import { DetailCocktail } from "../components/DetailCocktail/DetailCocktail";

export const Details = () => {
  const { id } = useParams();

  const [cocktail, setCocktail] = useState<Cocktail>({} as Cocktail);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getCocktail = async () => {
      const res = await httpServices.get(`lookup.php?i=${id}`);
      const cocktail = res.data.drinks
        ? (res.data.drinks[0] as Cocktail)
        : ({} as Cocktail);

      setCocktail(cocktail);
    };
    setLoading(true);
    getCocktail();
    setLoading(false);
  }, [id]);

  return (
    <>
      <Loader isLoading={isLoading} />
      {cocktail ? <DetailCocktail cocktail={cocktail} /> : null}
    </>
  );
};
