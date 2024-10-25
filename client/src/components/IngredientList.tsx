import { Ingredient } from "../types/recipe.types";

interface IngredientListProps {
	ingredients: Ingredient[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
	return (
		<div className="mb-4">
			<h4 className="font-semibold mb-2">Ingredients:</h4>
			<ul className="list-disc pl-5">
				{ingredients.map((ingredient, index) => (
					<li key={index} className="text-gray-700">
						{ingredient.name} - {ingredient.quantity}
					</li>
				))}
			</ul>
		</div>
	);
};

export default IngredientList;
