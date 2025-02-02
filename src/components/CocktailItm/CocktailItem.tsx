import { useNavigate } from "react-router-dom";
import { Cocktail } from "../../types/cocktail";
import { Tag } from "../Tag/Tag";
import "./style.css";

export const CocktailItem = ({ cocktail }: { cocktail: Cocktail }) => {
  let navigate = useNavigate();

  const tagList = cocktail.strTags?.split(",") || [];

  return (
    <div
      className="cocktail-item-container"
      onClick={() => navigate(`/details/${cocktail.idDrink}`)}
    >
      <h3>{cocktail.strDrink}</h3>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strImageAttribution ?? ""}
      />
      <div className="tag-container">
        {tagList.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </div>
  );
};
