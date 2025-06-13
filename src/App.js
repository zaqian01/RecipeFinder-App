import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import './styles/App.css'; // Main CSS
import './styles/global.css'; // Global CSS

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from Local Storage on initialization
    const savedFavorites = localStorage.getItem('recipeFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false); // State to display favorites

  // Save favorites to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchRecipes = async (query) => {
    if (!query) {
      setRecipes([]);
      setSelectedRecipe(null);
      setNoResults(false);
      setShowFavorites(false); // Hide favorites when query is empty
      return;
    }

    setLoading(true);
    setError(null);
    setNoResults(false);
    setSelectedRecipe(null); // Ensure detail is not shown after a new search
    setShowFavorites(false); // Hide favorites when performing a search

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
        setNoResults(false);
      } else {
        setRecipes([]);
        setNoResults(true);
      }
    } catch (e) {
      console.error("Error fetching recipes:", e);
      setError("Failed to fetch recipes. Please try again later.");
      setRecipes([]);
      setNoResults(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomRecipe = async () => {
    setLoading(true);
    setError(null);
    setNoResults(false);
    setSelectedRecipe(null); // Clear previous selection
    setRecipes([]); // Clear previous search results
    setSearchTerm(''); // Clear search input
    setShowFavorites(false); // Hide favorites

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setRecipes(data.meals); // Display random recipe in the grid
        // Or directly display detail: setSelectedRecipe(data.meals[0]);
      } else {
        setNoResults(true);
      }
    } catch (e) {
      console.error("Error fetching random recipe:", e);
      setError("Failed to fetch a random recipe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const fetchRecipeDetails = async (idMeal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      } else {
        setSelectedRecipe(null);
        setError("Recipe details not found.");
      }
    } catch (e) {
      console.error("Error fetching recipe details:", e);
      setError("Failed to fetch recipe details. Please try again later.");
      setSelectedRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (query) => {
    setSearchTerm(query);
    fetchRecipes(query);
  };

  const handleRecipeClick = (recipe) => {
    fetchRecipeDetails(recipe.idMeal);
  };

  const handleToggleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      const isCurrentlyFavorite = prevFavorites.some((fav) => fav.idMeal === recipe.idMeal);
      if (isCurrentlyFavorite) {
        return prevFavorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      } else {
        return [...prevFavorites, recipe];
      }
    });
  };

  const isRecipeFavorite = (recipe) => {
    return favorites.some((fav) => fav.idMeal === recipe.idMeal);
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setSelectedRecipe(null); // Ensure detail is not shown
    setRecipes([]); // Clear search results
    setSearchTerm(''); // Clear search input
  };

  const displayedRecipes = showFavorites ? favorites : recipes;
  const isDisplayingFavorites = showFavorites && favorites.length > 0;
  // This variable is no longer explicitly needed for its previous purpose,
  // but keeping it if there's any implicit usage or future need.
  // const isDisplayingSearchResults = !showFavorites && recipes.length > 0 && !selectedRecipe;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Discover Delicious Recipes</h1>
        <p>Explore thousands of recipes from around the world or find new inspiration!</p>
      </header>

      <SearchBar onSearch={handleSearchSubmit} onRandomSearch={fetchRandomRecipe} />

      <div className="action-buttons">
        <button onClick={handleShowFavorites}>
          View Favorites ({favorites.length}) <i className="fas fa-heart"></i>
        </button>
      </div>

      {loading && <p className="loading">Loading recipes, please wait...</p>}
      {error && <p className="error-message">{error}</p>}
      {noResults && <p className="no-results">No recipes found for your search.</p>}
      {showFavorites && favorites.length === 0 && !loading && !error && (
        <p className="no-results">You don't have any favorite recipes yet. Add some!</p>
      )}


      {selectedRecipe ? (
        <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
      ) : (
        <div className="results-grid">
          {displayedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onClick={handleRecipeClick}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isRecipeFavorite(recipe)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;