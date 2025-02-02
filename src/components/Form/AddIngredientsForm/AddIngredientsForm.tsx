import { ChangeEvent, useState, MouseEvent } from "react";
import { Ingredient } from "../../../types/cocktail";

interface AddIngredientsProps {
  ingredientList: Ingredient[];
  onAddIngredientList: (value: Ingredient) => void;
}

export const AddIngredientsForm = ({
  ingredientList,
  onAddIngredientList,
}: AddIngredientsProps) => {
  const [ingredient, setIngredient] = useState("");
  const [measure, setMeasure] = useState("");
  const [error, setError] = useState("");

  const onAddIngredient = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!ingredient || !measure) {
      setError("Please input both ingredient and amount");
      return;
    }
    if (ingredientList.length === 15) {
      setError("You have 15 ingredients, you can't add more");
      return;
    }
    onAddIngredientList({ ingredient, measurement: measure });
  };

  return (
    <>
      <div>
        <strong>Please note that you can add up to 15 ingredients</strong>
        <p>Ingredient:</p>
      </div>

      <input
        type="text"
        value={ingredient}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          error.length > 0 && setError("");
          setIngredient(event.target.value);
        }}
      />
      <p>Amount:</p>
      <input
        type="text"
        value={measure}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          error.length > 0 && setError("");
          setMeasure(event.target.value);
        }}
      />
      <button type="button" onClick={onAddIngredient}>
        Add ingredient
      </button>
      {error.length > 0 && <p className="error">{error}</p>}

      <div>
        {ingredientList.map((ingredient) => {
          return (
            <p key={ingredient.ingredient}>
              {ingredient.measurement} {ingredient.ingredient}
            </p>
          );
        })}
      </div>
    </>
  );
};
