import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cocktail } from "../types/cocktail";
import { httpServices } from "../services/httpService";
import { Loader } from "../components/Loader/Loader";

export const Details = () => {
  const { id } = useParams();

  const [cocktail, setCocktail] = useState<Cocktail>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getCocktail = async () => {
      const res = await httpServices.get("lookup.php?i=${id}");

      setCocktail(res.data.drinks[0] as Cocktail);
    };
    setLoading(true);
    getCocktail();
    setLoading(false);
  }, [id]);

  return (
    <>
      <Loader isLoading={isLoading} />
      {cocktail ? (
        <div>
          <h2>{cocktail.strDrink}</h2>
        </div>
      ) : null}
    </>
  );
};
