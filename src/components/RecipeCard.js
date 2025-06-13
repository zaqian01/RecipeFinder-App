import React from 'react';
import '../styles/components.css'; // Import component CSS

function RecipeCard({ recipe, onClick, onToggleFavorite, isFavorite }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    onToggleFavorite(recipe);
  };

  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <div className="recipe-card-image-container">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <span
          className={`favorite-icon ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          role="button" // Indicate it's an interactive element
          aria-pressed={isFavorite ? "true" : "false"} // Accessibility for favorite state
        >
          {isFavorite ? '❤️' : '🤍'} {/* Heart icon */}
        </span>
      </div>
      <div className="recipe-card-info">
        <h3>{recipe.strMeal}</h3>
        {/* You can add category or area if data is available */}
        {/* <p className="recipe-category">{recipe.strCategory}</p> */}
        {/* <p className="recipe-area">{recipe.strArea}</p> */}
        <button onClick={(e) => { e.stopPropagation(); onClick(recipe); }}>View Details <i className="fas fa-arrow-right"></i></button>
      </div>
    </div>
  );
}

export default RecipeCard;