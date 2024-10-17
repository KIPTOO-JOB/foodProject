from flask import Flask,request,make_response,jsonify
from flask_migrate import Migrate
from model import *


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///kitchen.db"

migrate = Migrate(app ,db)

db.init_app(app)



@app.route('/')
def index():
    return "<h1>hello</h1>"

@app.route('/recipes')
def recipes():

    recipes = []
    for recipe in Recipe.query.all():
        recipe_dict = recipe.to_dict()
        recipes.append(recipe_dict)

    response = make_response(
        recipes, 200
    )

    return response


@app.route('/recipes/<int:id>', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def recipe_by_id():
    recipe = Recipe.query.filter(Recipe.id == id).first()

    if recipe == None:
        response_body = {
            "message": "This record does not exist in our database"
        }
        response = make_response(response_body, 404)

        return response


    if request.method == 'GET':
        recipes = []
        for recipe in Recipe.query.all():
            recipe_dict = recipe.to_dict()
            recipes.append(recipe_dict)

        response = make_response(recipes, 200)

    elif request.method == 'POST':
        data = request.get_json()
        new_recipe = Recipe(
            title = request.json.get("title"),
            description = request.json.get("description"),
            instructions = request.json.get("instructions"),
            category_id = request.json.get("category_id"),
            created_at = request.json.get("created_at"),
            updated_at = request.get.json("updated_at"),
        )

        db.session.add(new_recipe)
        db.session.commit()

        recipe_dict = new_recipe.to_dict()

        response = make_response(
            recipe_dict, 201
        )

        return response
    
    elif request.method == 'PATCH':
        for attr in request.json:
            setattr(recipe, attr, request.json.get(attr))

        db.session.add(recipe)
        db.session.commit()

        recipe_dict = recipe.to_dict()

        response = make_response(
            recipe_dict, 200
        )

        return response
    
    elif request.method == 'DELETE':
        db.session.delete(recipe)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Recipe deleted"
        }

        response = make_response(
            response_body, 200
        )

        return response
    
@app.route('/categories')
def categories():

    categories = []
    for category in Category.query.all():
        category_dict = category.to_dict()
        category.append(category_dict)

    response = make_response(
        categories, 200
    )

    return response


@app.route('/categories/<int:id>', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def category_by_id():
    category = Category.query.filter(Category.id == id).first()

    if category == None:
        response_body = {
            "message": "This record does not exist in our database"
        }
        response = make_response(response_body, 404)

        return response


    if request.method == 'GET':
        categories = []
        for category in Category.query.all():
            category_dict = category.to_dict()
            category.append(category_dict)

        response = make_response(categories, 200)

    elif request.method == 'POST':
        data = request.get_json()
        new_category = Category(
            name = request.json.get("name"),
            description = request.json.get("description"),
        )

        db.session.add(new_category)
        db.session.commit()

        category_dict = new_category.to_dict()

        response = make_response(
            category_dict, 201
        )

        return response
    
    elif request.method == 'PATCH':
        for attr in request.json:
            setattr(category, attr, request.json.get(attr))

        db.session.add(category)
        db.session.commit()

        category_dict = category.to_dict()

        response = make_response(
            category_dict, 200
        )

        return response
    
    elif request.method == 'DELETE':
        db.session.delete(category)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Recipe deleted"
        }

        response = make_response(
            response_body, 200
        )

        return response
    
@app.route('/reviews')
def reviews():

    reviews = []
    for review in Review.query.all():
        review_dict = review.to_dict()
        review.append(review_dict)

    response = make_response(
        reviews, 200
    )

    return response


@app.route('/reviews/<int:id>', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def _review_by_id():
    review = Review.query.filter(Review.id == id).first()

    if review == None:
        response_body = {
            "message": "This record does not exist in our database"
        }
        response = make_response(response_body, 404)

        return response


    if request.method == 'GET':
        reviews = []
        for review in Review.query.all():
            review_dict = review.to_dict()
            review.append(review_dict)

        response = make_response(reviews, 200)

    elif request.method == 'POST':
        data = request.get_json()
        new_review = Review(
            recipe_id = request.json.get("recipe_id"),
            user_id = request.json.get("user_id"),
            rating = request.json.get("rating")
        )

        db.session.add(new_review)
        db.session.commit()

        review_dict = new_review.to_dict()

        response = make_response(
            review_dict, 201
        )

        return response
    
    elif request.method == 'PATCH':
        for attr in request.json:
            setattr(review, attr, request.json.get(attr))

        db.session.add(review)
        db.session.commit()

        review_dict = review.to_dict()

        response = make_response(
            review_dict, 200
        )

        return response
    
    elif request.method == 'DELETE':
        db.session.delete(review)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Recipe deleted"
        }

        response = make_response(
            response_body, 200
        )

        return response
    
@app.route('/recipes/<str:ingredient>')
def recipe_by_ingredient(ingredient):
    recipe = Recipe.query.filter(Recipe.ingredient == ingredient).first()

    recipe_dict = recipe.to_dict()

    response = make_response(recipe_dict, 200)