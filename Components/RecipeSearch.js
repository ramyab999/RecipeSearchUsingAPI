import React, { useState } from "react";
import "../../src/styles.css";

const API_KEY = "300e0cf8d05243d9b8f17adc8e279eb5";

const RecipeSearch = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ingredient.trim()) return;

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=10&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="recipe-container">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={ingredient}
          placeholder="Enter an ingredient..."
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
