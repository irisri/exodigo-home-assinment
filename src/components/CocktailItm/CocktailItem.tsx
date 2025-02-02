import { Cocktail } from "../../types/cocktail";

export const CocktailItem = ({ cocktail }: { cocktail: Cocktail }) => {
  const tagList = cocktail.strTags?.split(",") || [];

  return (
    <div>
      <h3>{cocktail.strDrink}</h3>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strImageAttribution ?? ""}
      />
      <>
        {tagList.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </>
    </div>
  );
};
