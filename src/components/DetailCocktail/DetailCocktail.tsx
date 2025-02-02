import { useMemo } from "react";
import { Cocktail } from "../../types/cocktail";
import { Tag } from "../Tag/Tag";
import { getIngredients } from "../../utils/util";
import "./style.css";

export const DetailCocktail = ({ cocktail }: { cocktail: Cocktail }) => {
  const ingredients = useMemo(() => {
    return getIngredients(cocktail);
  }, [cocktail]);

  const tagList = cocktail.strTags?.split(",") || [];

  return (
    <div className="detail-cocktail-container">
      <h2>{cocktail.strDrink}</h2>
      <p>
        <strong>Drink type:</strong> {cocktail.strAlcoholic}
      </p>
      <p>
        <strong>Category:</strong> {cocktail.strCategory}
      </p>
      <p>
        <strong>Glass type:</strong> {cocktail.strGlass}
      </p>

      {ingredients && ingredients.length > 0 && (
        <div className="detail-cocktail-ingredient-container">
          <h3>
            <strong>Ingredients:</strong>
          </h3>
          {ingredients.map((ingredient) => {
            return (
              <p key={`${ingredient.ingredient}-${ingredient.measurement}`}>
                {ingredient.measurement} {ingredient.ingredient}
              </p>
            );
          })}
        </div>
      )}

      <div className="detail-cocktail-ingredient-container">
        <h3>
          <strong>Directions:</strong>
        </h3>
        <p>{cocktail.strInstructions}</p>
      </div>
      <div className="detail-cocktail-tag-container">
        {tagList.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>

      <img src={cocktail.strDrinkThumb} />
    </div>
  );
};
