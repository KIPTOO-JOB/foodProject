export interface Ingredient {
	name: string;
	quantity: string;
}

export interface User {
	email: string;
	full_name: string;
	id: number;
	password: string;
	username: string;
}

export interface Review {
	user: User;
	comment: string;
}

export interface Category {
	name: string;
}

export interface Recipe {
	id: number;
	title: string;
	image_url: string;
	description: string;
	ingredients: Ingredient[];
	instructions: string;
	category: Category | null;
	reviews: Review[];
}
