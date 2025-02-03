import { useState, ChangeEvent, FormEvent } from "react";
import { Cocktail, Ingredient } from "../../types/cocktail";
import { getCocktailFromNew, storageService } from "../../utils/util";
import { AddIngredientsForm } from "./AddIngredientsForm/AddIngredientsForm";
import { AddTagsForm } from "./AddTagsForm/AddTagsForm";
import { UploadFile } from "./UploadFile/UploadFile";
import { ADDed_COCKTAIL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";

export const CocktailForm = () => {
  let navigate = useNavigate();

  const [cocktailName, setCocktailName] = useState("");
  const [cocktailCategory, setCocktailCategory] =
    useState<Cocktail["strCategory"]>("Ordinary Drink");
  const [cocktailAlcoholic, setCocktailAlcoholic] =
    useState<Cocktail["strAlcoholic"]>("Non alcoholic");
  const [cocktailGlass, setCocktailGlass] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState("");
  const [img, setImg] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (ingredientList.length === 0) {
      toast.error("Please add at least 1 ingredient");
      return;
    }

    if (!cocktailAlcoholic) {
      toast.error("Please add drink type");
      return;
    }

    if (!cocktailCategory) {
      toast.error("Please add drink category");
      return;
    }

    if (img.length === 0) {
      toast.error("Please add drink image");
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

    const addedCocktailsString = storageService.get(ADDed_COCKTAIL);
    const addedCocktails = addedCocktailsString
      ? (JSON.parse(addedCocktailsString) as Cocktail[])
      : ([] as Cocktail[]);

    storageService.set(
      ADDed_COCKTAIL,
      JSON.stringify([...addedCocktails, cocktail])
    );

    toast.success("You added a drink to the database!");

    await navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
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
        <div className="select-container">
          <select
            required
            value={cocktailAlcoholic}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setCocktailAlcoholic(
                event.target.value as Cocktail["strAlcoholic"]
              );
            }}
          >
            <option value={"Non alcoholic"}>Non alcoholic</option>
            <option value={"Alcoholic"}>Alcoholic</option>
          </select>
        </div>
      </div>

      <div className="form-field-container">
        <p>Category:</p>
        <div className="select-container">
          <select
            required
            value={cocktailCategory}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setCocktailCategory(
                event.target.value as Cocktail["strCategory"]
              );
            }}
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

      <UploadFile setImg={setImg} />

      <button className="submit-button">Submit cocktail</button>
    </form>
  );
};
