from flask import Flask, request, make_response, jsonify
from flask_migrate import  Migrate
from models import *
import os
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///kitchen.db"

# Initialize migration and database
migrate = Migrate(app, db)
db.init_app(app)

# Initialize JWT Manager
jwt = JWTManager(app)

# Routes
@app.route('/')
def index():
    return "<h1>Hello, welcome to the Kitchen API</h1>"


#Users
@app.route('/users', methods=['POST', 'GET'])
def users():
    if request.method == 'GET':
        response=  [user.to_dict() for user in User.query.all() ]
        
        return make_response(response, 200)
    
    if request.method == 'POST':
        data = request.get_json()
        new_user = User(username=data['username'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        
        return make_response(new_user.to_dict(), 201)
    
    
@app.route('/users/<int:id>', methods=['DELETE', 'PATCH', 'GET'])
def user(id):
    if request.method == 'GET':
        user  = User.query.get(id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        return make_response(user.to_dict(), 200)
    
    if request.method == 'DELETE':
        user  = User.query.get(id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        
        return make_response({"message": "user deleted successfully"}, 200)
    
    if request.method == "PATCH":
        user  = User.query.get(id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        
        data = request.get_json()
        print(data)
        for attr in request.get_json():
            setattr(user, attr, request.get_json().get(attr))
            
        db.session.add(user)
        db.session.commit()
            
        return make_response(user.to_dict(), 200)


# User Registration
@app.route('/register', methods = ['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    full_name = data.get('full_name')

    if User.query.filter_by(username=username).first():
        return make_response(jsonify({"msg":"Username already exists"}), 201)
    
    new_user = User(username=username, password=password, email=email, full_name=full_name)
    new_user.set_password(data.get('password'))
    db.session.add(new_user)
    db.session.commit()

    return make_response(jsonify({"msg":"User registered successfully"}), 200)

    #User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return make_response(jsonify(access_token=access_token), 200)

    return make_response(jsonify({"msg": "Bad username or password"}), 401)

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
