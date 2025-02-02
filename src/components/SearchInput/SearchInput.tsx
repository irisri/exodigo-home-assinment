import { ChangeEvent, useContext } from "react";
import { CocktailContext } from "../../state/CocktailContext";
import { Icon } from "../Icon/Icon";
import "./style.css";

export const SearchInput = () => {
  const { searchInput, setSearchInput, error } = useContext(CocktailContext);

  return (
    <>
      <div className="search-container">
        <Icon icon={"search"} size="xs" />
        <input
          type="text"
          value={searchInput}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(event.target.value)
          }
        />
      </div>
      {error.length > 0 && (
        <p className="error">
          <strong>{error}</strong>
        </p>
      )}
    </>
  );
};
