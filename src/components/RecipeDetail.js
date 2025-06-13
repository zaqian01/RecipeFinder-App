import React from 'react';
import '../styles/components.css'; // Import component CSS

function RecipeDetail({ recipe, onBack }) {
  if (!recipe) return null;

  // Helper to get all ingredients and measures
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
      }
    }
    return ingredients;
  };

  const ingredientsList = getIngredients(recipe);

  return (
    <div className="recipe-detail">
      <div className="detail-header">
        <button onClick={onBack} aria-label="Go back to recipe list"><i className="fas fa-arrow-left"></i> Back to Recipes</button>
        {/* You can add favorite button here too */}
      </div>
      <h2>{recipe.strMeal}</h2>
      {recipe.strCategory && recipe.strArea && (
        <p className="recipe-meta">
          <i className="fas fa-tag"></i> {recipe.strCategory} | <i className="fas fa-globe"></i> {recipe.strArea}
        </p>
      )}
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />

      <div className="recipe-detail-content">
        <div className="ingredients-section">
          <h3><i className="fas fa-blender"></i> Ingredients:</h3>
          <ul>
            {ingredientsList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="instructions-section">
          <h3><i className="fas fa-utensils"></i> Instructions:</h3>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
      {recipe.strYoutube && (
        <div className="video-section">
            <h3><i className="fab fa-youtube"></i> Video Instructions:</h3>
            <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;