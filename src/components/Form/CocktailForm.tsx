import { useState, ChangeEvent } from "react";
import { Cocktail, Ingredient } from "../../types/cocktail";
import { getCocktailFromNew } from "../../utils/util";
import { AddIngredientsForm } from "./AddIngredientsForm/AddIngredientsForm";
import { AddTagsForm } from "./AddTagsForm/AddTagsForm";
import { UploadFile } from "./UploadFile/UploadFile";
import "./style.css";

export const CocktailForm = () => {
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailCategory, setCocktailCategory] =
    useState<Cocktail["strCategory"]>();
  const [cocktailAlcoholic, setCocktailAlcoholic] =
    useState<Cocktail["strAlcoholic"]>();
  const [cocktailGlass, setCocktailGlass] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    if (ingredientList.length === 0) {
      setError("Please add at least 1 ingredient");
      return;
    }

    if (!cocktailAlcoholic) {
      setError("Please add drink type");
      return;
    }

    if (!cocktailCategory) {
      setError("Please add drink category");
      return;
    }

    const cocktail = getCocktailFromNew({
      cocktailAlcoholic,
      cocktailCategory,
      cocktailGlass,
      cocktailName,
      tags,
      ingredientList,
      instructions,
      img,
    });
  };

  return (
    <form>
      <div className="form-field-container">
        <p>Cocktail name:</p>
        <input
          required
          type="text"
          value={cocktailName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCocktailName(event.target.value)
          }
        />
      </div>

      <div className="form-field-container">
        <p>Glass type:</p>
        <input
          required
          type="text"
          value={cocktailGlass}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCocktailGlass(event.target.value)
          }
        />
      </div>

      <div className="form-field-container">
        <p>Drink type:</p>
        <select
          required
          value={cocktailAlcoholic}
          onSelect={(event: ChangeEvent<HTMLSelectElement>) =>
            setCocktailAlcoholic(event.target.value as Cocktail["strAlcoholic"])
          }
        >
          <option value={"Non alcoholic" as Cocktail["strAlcoholic"]}>
            Non alcoholic
          </option>
          <option value={"Alcoholic" as Cocktail["strAlcoholic"]}>
            Alcoholic
          </option>
        </select>
      </div>

      <div className="form-field-container">
        <p>Category:</p>
        <select
          required
          value={cocktailCategory}
          onSelect={(event: ChangeEvent<HTMLSelectElement>) =>
            setCocktailCategory(event.target.value as Cocktail["strCategory"])
          }
        >
          <option value={"Ordinary Drink" as Cocktail["strCategory"]}>
            Ordinary Drink
          </option>
          <option value={"Cocktail" as Cocktail["strCategory"]}>
            Cocktail
          </option>
          <option value={"Other / Unknown" as Cocktail["strCategory"]}>
            Other / Unknown
          </option>
          <option value={"Shot" as Cocktail["strCategory"]}>Shot</option>
        </select>
      </div>

      <div className="form-field-container">
        <AddTagsForm
          tags={tags}
          onAddTags={(tag: string) =>
            setTags((prevState) => [...prevState, tag])
          }
        />
      </div>

      <div className="form-field-container">
        <AddIngredientsForm
          ingredientList={ingredientList}
          onAddIngredientList={(value: Ingredient) =>
            setIngredientList((prevState) => [...prevState, value])
          }
        />
      </div>

      <div className="form-field-container">
        <p>Instructions:</p>
        <textarea
          value={instructions}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setInstructions(event.target.value)
          }
          required
        />
      </div>

      <UploadFile setError={setError} setImg={setImg} />

      {error.length > 0 && <p className="error">{error}</p>}

      <button className="submit-button" onSubmit={onSubmit}>
        Submit cocktail
      </button>
    </form>
  );
};
