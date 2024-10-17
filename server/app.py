from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from model import *

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///kitchen.db"

# Initialize migration and database
migrate = Migrate(app, db)
db.init_app(app)

# Routes
@app.route('/')
def index():
    return "<h1>Hello, welcome to the Kitchen API</h1>"

# Recipes Route
@app.route('/recipes', methods=['GET', 'POST'])
def handle_recipes():
    if request.method == 'GET':
        recipes = [recipe.to_dict() for recipe in Recipe.query.all()]
        return make_response(jsonify(recipes), 200)

    elif request.method == 'POST':
        data = request.get_json()
        new_recipe = Recipe(
            title=data.get("title"),
            description=data.get("description"),
            instructions=data.get("instructions"),
            category_id=data.get("category_id"),
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at")
        )
        db.session.add(new_recipe)
        db.session.commit()
        return make_response(new_recipe.to_dict(), 201)

@app.route('/recipes/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def recipe_by_id(id):
    recipe = Recipe.query.get(id)
    if not recipe:
        return make_response(jsonify({"message": "Recipe not found"}), 404)

    if request.method == 'GET':
        return make_response(recipe.to_dict(), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            setattr(recipe, key, value)
        db.session.commit()
        return make_response(recipe.to_dict(), 200)

    elif request.method == 'DELETE':
        db.session.delete(recipe)
        db.session.commit()
        return make_response({"message": "Recipe deleted successfully"}, 200)

# Categories Route
@app.route('/categories', methods=['GET', 'POST'])
def handle_categories():
    if request.method == 'GET':
        categories = [category.to_dict() for category in Category.query.all()]
        return make_response(jsonify(categories), 200)

    elif request.method == 'POST':
        data = request.get_json()
        new_category = Category(
            name=data.get("name"),
            description=data.get("description")
        )
        db.session.add(new_category)
        db.session.commit()
        return make_response(new_category.to_dict(), 201)

@app.route('/categories/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def category_by_id(id):
    category = Category.query.get(id)
    if not category:
        return make_response(jsonify({"message": "Category not found"}), 404)

    if request.method == 'GET':
        return make_response(category.to_dict(), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            setattr(category, key, value)
        db.session.commit()
        return make_response(category.to_dict(), 200)

    elif request.method == 'DELETE':
        db.session.delete(category)
        db.session.commit()
        return make_response({"message": "Category deleted successfully"}, 200)

# Reviews Route
@app.route('/reviews', methods=['GET', 'POST'])
def handle_reviews():
    if request.method == 'GET':
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(jsonify(reviews), 200)

    elif request.method == 'POST':
        data = request.get_json()
        new_review = Review(
            recipe_id=data.get("recipe_id"),
            user_id=data.get("user_id"),
            rating=data.get("rating")
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)

@app.route('/reviews/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def review_by_id(id):
    review = Review.query.get(id)
    if not review:
        return make_response(jsonify({"message": "Review not found"}), 404)

    if request.method == 'GET':
        return make_response(review.to_dict(), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            setattr(review, key, value)
        db.session.commit()
        return make_response(review.to_dict(), 200)

    elif request.method == 'DELETE':
        db.session.delete(review)
        db.session.commit()
        return make_response({"message": "Review deleted successfully"}, 200)

# Start the Flask app
if __name__ == '__main__':
    app.run(port=5555, debug=True)
