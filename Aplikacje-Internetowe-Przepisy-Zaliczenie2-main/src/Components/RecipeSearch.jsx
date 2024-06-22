import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import "./RecipeSearch.css";
import Recipe from "./Recipe";

const APP_ID = "290f3d00";
const APP_KEY = "106affb0bad419317c21b2508840de17";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const searchInput = useRef(null);

  const searchRecipes = useCallback(async () => {
    setError(null);
    if (query) {
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setRecipes(response.data.hits);
        if (searchInput.current) searchInput.current.blur();
      } catch (error) {
        console.error(error);
        setRecipes([]);
        setError("An error occurred while fetching recipes");
      }
    }
  }, [query]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        searchRecipes();
      }
    },
    [searchRecipes]
  );

  const onSearchInputChange = (event) => {
    if (event.target.value === "") {
      setRecipes([]);
    }
    setQuery(event.target.value);
  };

  const renderRecipes = useCallback(() => {
    return recipes.map((recipe, index) => (
      <Recipe recipe={recipe} key={index} />
    ));
  }, [recipes]);

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Recipe finder</h1>
        <h2>search you own recipe</h2>
      </div>

      <div className="input-group mb-3 mt-3">
        <input
          type="text"
          ref={searchInput}
          className="form-control"
          placeholder="Search for recipes"
          value={query}
          onChange={onSearchInputChange}
          onKeyUp={handleKeyPress}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={searchRecipes}>
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          renderRecipes()
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
