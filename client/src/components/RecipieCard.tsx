import React from "react";
import { Recipe } from "../types/recipe.types";
import ReviewList from "./ReviewList";
import IngredientList from "../components/IngredientList";

interface RecipeCardProps {
	recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
	return (
		<div className="recipe-card p-4 bg-white rounded-lg shadow-md">
			<h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
			<img
				src={recipe.image_url}
				alt={recipe.title}
				className="w-full h-48 object-cover rounded-md mb-4"
			/>
			<p className="text-sm text-gray-600 mb-2">
				Category: {recipe.category?.name || "N/A"}
			</p>
			<p className="mb-3">{recipe.description}</p>
			<div className="bg-gray-50 p-3 rounded-md mb-3">
				<h4 className="font-semibold mb-2">Instructions:</h4>
				<p>{recipe.instructions}</p>
			</div>
			<IngredientList ingredients={recipe.ingredients} />
			<ReviewList reviews={recipe.reviews} />
		</div>
	);
};

export default RecipeCard;
