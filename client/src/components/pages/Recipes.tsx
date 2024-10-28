import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../types/recipe.types";
import RecipeCard from "../RecipieCard";
import LoadingSpinner from "../loading/LoadingSpinner";
// import { main } from "framer-motion/client";
import Navbar from "../Navbar";

const Recipes: React.FC = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem("access_token");

		if (!token) {
			console.error("No authorization token found in session");
			navigate("/login");
			return;
		}

		const fetchRecipes = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					"https://server-v95o.onrender.com/recipes",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Failed to fetch recipes: ${response.statusText}`);
				}

				const data = await response.json();
				setRecipes(Array.isArray(data) ? data : data.recipes || []);
			} catch (error) {
				console.error("Error fetching recipes:", error);
				setError(
					error instanceof Error ? error.message : "An unknown error occurred"
				);
				if (error instanceof Response && error.status === 401) {
					navigate("/login");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, [navigate]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<div className="text-center p-4">
				<p className="text-red-500 font-semibold">Error: {error}</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<main>
			<nav>
				<Navbar />
			</nav>
			<div className="max-w-7xl mx-auto  px-4 py-8 mt-14">
				{recipes.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{recipes.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				) : (
					<p className="text-center text-gray-500 text-lg">No recipes found.</p>
				)}
			</div>
		</main>
	);
};

export default Recipes;
