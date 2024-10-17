from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates


db = SQLAlchemy()

class Recipe(db.Model):
    __tablename__='recipes'

    id = db.Column(db.Integer, primary_key=True)    
    title = db.Column(db.String,nullable=False)
    description = db.Column(db.String(250),nullable=False)
    instructions = db.Column(db.String,nullable=False)
    created_at = db.Column(db.DateTime,default=db.func.current_timestamp)
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    
    category = db.relationship('Category',back_populates='recipe') 
 
class Category(db.Model):
    __tablename__='categories'
    
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String(250))

    recipe = db.relationship('Recipe',back_populates='category')


class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    
    id = db.Column(db.Integer,primary_key=True)
    name =db.Column(db.Integer)
    
    #type ingredinet type =>  eg spice,dairy
    type = db.Column(db.String)
    calories= db.Column(db.Integer, nullable=True)
    
    
class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String(450))
    
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    recipe = db.relationship('Recipe', back_populates='reviews')
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
 


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    username = db.Column(db.Integer,nullable=False,unique=True)
    email = db.Column(db.String, unique=True,nullable=False )

    password = db.Column(db.String, unique=True)

    created_at = db.Column(db.DateTime,default=db.func.current_timestamp)
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
